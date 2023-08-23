import express from "express";
import Cart from "../Models/Cart.mjs";
// import Product from "../Models/Product.mjs";

const router = express.Router();

router.post('/addtocart/:productReference', (req, res) => {
    const productReference = req.params.productReference
    const newCartItem = new Cart({
        product: productReference
    })
    res.json({msg: 'item added to cart'})
    newCartItem.save()
})

//access the cart
router.get('/cart/:cartId', (req, res) => {
    try {
        res.json('cart:')
    } catch (err) {
        console.error("can not access cart");
        res.status(500).json({ msg: "Server error" });
    }
});

//

export default router;
