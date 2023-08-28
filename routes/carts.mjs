import express from "express"
import Order from "../Models/Order.mjs"
import Product from "../Models/Product.mjs"
import session from "express-session"
import cookieParser from "cookie-parser"
import { v4 as uuidv4 } from 'uuid'


//express router instance
const router = express()
//an object to store cart items for different users
const cart = {}

//session and cookie-parser middleware
router.use(cookieParser())
router.use(session({
    secret: 'webshop1234',
    resave: false, //don't save the session if not modified
    saveUninitialized: true, //Save new session that have been modified
    cookie: { secure: false } //cookie settings are not secured, for the sake of development(false)
}))

/*------------------------------- Post request to add an Item to cart ----------------------------------*/
router.post('/order', async (req, res) => {
    try {
        let userId = req.session.userId

        //generate a new userId if not present in the session
        if (!userId) {
            userId = uuidv4();
            req.session.userId = userId;
            console.log('Setting userId in session:', userId);
        }

        console.log('Generated userId:', userId);
        const { productId } = req.params
        const { quantity, chest, waist, hips } = req.body

        // Fetch the product based on the productId
        // const product = await Product.findById(productId)
        
        //Create a cart if the user doesn't have one
        if(!cart[userId]) {
            cart[userId] = []
        }

        // Create an arrow function to create cart items
        const createCartItem = (userId, reference, quantity, chest, waist, hips, price, image) => ({
            userId,
            reference,
            quantity,
            chest,
            waist,
            hips,
            price,
            image
        })

        //create a new cart item and add it to the user's cart
        const cartItem = createCartItem({
            userId: userId,
            reference: Product.reference,
            quantity,
            chest,
            waist,
            hips,
            price: Product.price,
            image: Product.image
        })
        cart[userId].push(cartItem)
        // await cartItem.save() //add item to the database
        res.json({ msg: 'Item added to cart' })
    } catch (error) {
        console.error('Error adding item to cart:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


/*---------------------------- Get request to retrieve cart items of the user ---------------------------*/
router.get('/',async(req, res) => {
    try {

        const userId = req.session.userId;
        console.log('Retrieved userId from session:', userId);
        
        const userCartItems = cart[userId] || []

        console.log('Fetched cart items:', userCartItems)

        res.json(userCartItems)
    } catch (error) {
        console.error('Error fetching cart:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

/*------------------------------- Post request to checkout and place an order  ---------------------------*/
router.post('/order/checkout', async (req, res) => {
    try {
        const userId = req.session.userId;
        const cartItems = cart[userId] || [];
        console.log('Generated userId:', userId);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' })
            
        }

         // Extract order details from the request body
        const { status, firstname, lastname, email, address, bankDetails } = req.body

        //create order items based on the cart items
        const orderItems = cartItems.map(cartItem => ({
            reference: cartItem.reference,
            waist: cartItem.waist,
            chest: cartItem.chest,
            hips: cartItem.hips,
            price: cartItem.price,
            image: cartItem.image
        }));

        // Create a new Order instance and save it to the database
        const order = new Order({
            status,
            firstname,
            lastname,
            email,
            address,
            bankDetails,
            items: orderItems
        });

        await order.save()
        // Clear the user's cart after successful checkout
        cart[userId] = []
        
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})



export default router






//npm install express express-session cookie-parser
//npm install uuid