import express from "express"
import Order from "../Models/Order.mjs"
import Product from "../Models/Product.mjs"
import session from "express-session"
import cookieParser from "cookie-parser"
import { v4 as uuidv4 } from "uuid"
import Stripe from "stripe"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()
import authenticateUser from "../middleware/authenticateUser.mjs"
import checkRole from "../middleware/checkRole.mjs"

const router = express()

//an object to store cart items for different users
const cart = {}

//session and cookie-parser middleware
router.use(cookieParser())
router.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false, //don't save the session if not modified
    saveUninitialized: true, //Save new session that have been modified
    cookie: { secure: false }, //cookie settings are not secured, for the sake of development(false)
  })
)

/*------------------------------- Post request to add an Item to cart ----------------------------------*/

router.post("/order", async (req, res) => {
  try {
    let orderId = req.session.orderId

    //generate a new orderId if not present in the session
    if (!orderId) {
      orderId = uuidv4()
      req.session.orderId = orderId
      console.log("Setting orderId in session:", orderId)
    }

    console.log("Generated orderId:", orderId)

    const { reference, quantity, chest, waist, hips } = req.body

    // Récupère produit apd db et vérifie s'il existe
    const product = await Product.findOne({ reference: reference })
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    //Create a cart if the user doesn't have one
    if (!cart[orderId]) {
      cart[orderId] = []
    }

    // function that create cart items
    const createCartItem = (
      orderId,
      reference,
      quantity,
      chest,
      waist,
      hips,
      price,
      totalPrice
    ) => ({
      orderId,
      reference,
      quantity,
      chest,
      waist,
      hips,
      price,
      totalPrice,
    })

    //create a new cart item and add it to the user's cart
    const cartItem = createCartItem(
      orderId,
      product.reference,
      req.body.quantity,
      req.body.chest,
      req.body.chest,
      req.body.hips,
      product.price,
      product.price * quantity
    )

    cart[orderId].push(cartItem)
    console.log(cartItem)
    res.json({ msg: "Item added to cart" })
  } catch (error) {
    console.error("Error adding item to cart:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

//*---------- -----------------------  Stripe checkout session ---------------------------------*//

const YOUR_DOMAIN = "http://localhost:4242"

router.post("/create-checkout-session", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: "2023-08-16",
  })
  try {
    const orderId = req.session.orderId
    const cartItems = cart[orderId] || []

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    // Extract customer details from the request body
    const { firstname, lastname, email, address } = req.body

    // Create line_items based on the items in the cart
    const line_items = cartItems.map((cartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.reference,
        },
        unit_amount: parseInt(cartItem.price * 100), // 'Cause in cents
      },
      quantity: cartItem.quantity,
    }))

    //// Add a fixed shipping fee of 12 euros
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 1200,
      },
      quantity: 1,
    })

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`, //create a succes payment page
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    })

    //create order items based on the cart items
    const orderItems = cartItems.map((cartItem) => ({
      product: cartItem.reference,
      quantity: cartItem.quantity,
      chest: cartItem.chest,
      waist: cartItem.waist,
      hips: cartItem.hips,
      price: cartItem.price,
      totalPrice: cartItem.totalPrice,
    }))
    console.log("log of orderItems :", orderItems)

    const order = new Order({
      firstname,
      lastname,
      email,
      address,
      status: "en attente de paiement", //initializing payment status
      items: cartItems.map((cartItem) => ({
        product: cartItem.reference,
        quantity: cartItem.quantity,
        chest: cartItem.chest,
        waist: cartItem.waist,
        hips: cartItem.hips,
        price: cartItem.price,
        totalPrice: cartItem.totalPrice,
      })),
    })
    
    //And save them in the database
    await order.save()

    req.session.cartItems = cartItems
    console.log(session.url)
    res.redirect(303, session.url)

  } catch (error) {
    console.error("Error creating checkout session:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})


router.get('/orders', authenticateUser, checkRole(["admin"]), async (req, res)=> {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    console.error("Error while retrieving orders :", err)
    res.status(500).json({ error: "Server error"})
  }
})

router.get('/orders/:orderId', authenticateUser, checkRole(["admin"]), async (req, res) => {
  try {
    const _id = req.params.orderId
    const order = await Order.find({ _id })

    if (!order) {
      res.status(404).json({ error: 'Order not found'})
    }

    res.json(order)
  } catch (err) {
    console.error('Error while retrieving the order')
    res.status(500).json( { error: "Order not found"})
  }
})




/*---------------------------- Get request to retrieve cart items of the user ---------------------------*/
router.get("/", async (req, res) => {
 try {
   const orderId = req.session.orderId
   console.log("Retrieved orderId from session:", orderId)

   const userCartItems = cart[orderId] || []

   console.log("Fetched cart items:", userCartItems)

   res.json(userCartItems)
 } catch (error) {
   console.error("Error fetching cart:", error)
   res.status(500).json({ message: "Internal server error" })
 }
})

/*------------------------------ stripe webhook ------------------------------------------*/
router.post("/stripe-webhook", bodyParser.raw({type: 'application/json'}), async(req, res) => {
  const event = req.body
  const orderId = req.body.orderId


  switch(event.type) {
    case 'payment_intent.succeeded':
      // const paymentIntent = event.data.object

      // Update the order status to "payment success"
      await Order.updateOne({ _id: orderId }, 
        { status: "payment success" })
        console.log(orderId)
        console.log("payment was successful")
        console.log("log of order:", Order)
    break;

    case 'payment_intent.payment_failed':
      // Update the order status to "payment success"
      await Order.updateOne({ _id: orderId }, 
        { status: "payment failed" })

        console.log("payment failed")
    break;

    default:
      console.log(`unhandled event type ${event.type}`)
    
  }

  res.json({received: true})

})



export default router


