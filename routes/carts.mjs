import express from "express"
import Order from "../Models/Order.mjs"
import Product from "../Models/Product.mjs"
import session from "express-session"
import cookieParser from "cookie-parser"
import { v4 as uuidv4 } from "uuid"
import Stripe from "stripe"

const router = express()

//an object to store cart items for different users
const cart = {}

//session and cookie-parser middleware
router.use(cookieParser())
router.use(
  session({
    secret: "webshop1234", // This should be hidden and saved as a key in heroku, right?
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

// Tentative  de stripe checkout session //

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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/?succes=true`, //create a succes payment page
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    })

    req.session.cartItems = cartItems
    console.log(session.url)
    res.redirect(303, session.url)
  } catch (error) {
    console.error("Error creating checkout session:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})
//

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

/*------------------------------- Post request to checkout and place an order  ---------------------------*/
router.post("/order/checkout", async (req, res) => {
  try {
    const orderId = req.session.orderId
    const cartItems = req.session.cartItems || []
    console.log("Generated orderId:", orderId)

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    // Extract order details from the request body
    const { firstname, lastname, email, address } = req.body

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

    //Total price (total amount of cart + shipping)
    const sumTotal = (arr) =>
      arr.reduce(
        (sum, { totalPrice, quantity }) => sum + totalPrice * quantity,
        0
      )
    const cartTotal = sumTotal(cartItems)
    const shippingFee = 15.0
    const total = cartTotal + shippingFee
    console.log("Go checkout : ", total)

    // Create a new Order instance and save it to the database
    const order = new Order({
      firstname,
      lastname,
      email,
      address,
      items: [...orderItems],
    })

    console.log("log of Order :", order)

    await order.save()
    // Clear the user's cart after successful checkout
    req.session.cartItems = []
    //res.redirect('/success')
    res.status(201).json({ message: "Order placed successfully" })
  } catch (error) {
    console.error("Error placing order:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// reste a calculer le totalOrder = all totalPrice + shipping + add paypal

export default router

//npm install express express-session cookie-parser
//npm install uuid
