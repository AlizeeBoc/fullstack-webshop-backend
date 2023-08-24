import express from "express"
import Cart from "../Models/Cart.mjs"
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

router.post('/addtocart/:productId', async (req, res) => {
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
        await cartItem.save()
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


export default router






//npm install express express-session cookie-parser
//npm install uuid