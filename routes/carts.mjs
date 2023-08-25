import express from "express"
import Cart from "../Models/Cart.mjs"
import Order from "../Models/Order.mjs"
import Product from "../Models/Product.mjs"
import session from "express-session"
import cookieParser from "cookie-parser"
import { v4 as uuidv4 } from 'uuid'


const router = express()
const cart = {}

//session and cookie-parser middleware
router.use(cookieParser())
router.use(session({
    secret: 'webshop1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

router.post('/order', async (req, res) => {
    try {
        let userId = req.session.userId;

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

        const cartItem = new Cart({
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
        // await cartItem.save()
        res.json({ msg: 'Item added to cart' })
    } catch (error) {
        console.error('Error adding item to cart:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


// retrieve cart items for the user
router.get('/',async(req, res) => {
    try {

        const userId = req.session.userId;
        console.log('Retrieved userId from session:', userId);
        
        const cartItems = await Cart.find({ userId })

        console.log('Fetched cart items:', cartItems)

        res.json(cartItems)
    } catch (error) {
        console.error('Error fetching cart:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// Checkout
router.post('/order/checkout', async (req, res) => {
    try {
        const userId = req.session.userId;
        const cartItems = cart[userId] || [];
        
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' })
        }

        const { status, firstname, lastname, email, address, bankDetails } = req.body

        const orderItems = cartItems.map(cartItem => ({
            reference: cartItem.reference,
            waist: cartItem.waist,
            chest: cartItem.chest,
            hips: cartItem.hips,
            price: cartItem.price,
            image: cartItem.image
        }));

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
        // Clear the user's cart after checkout
        cart[userId] = []
        
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})



export default router






//npm install express express-session cookie-parser
//npm install uuid