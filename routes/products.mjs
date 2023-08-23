import express, {json} from "express"
const router = express()
import Product from "../Models/Product.mjs";

router.use(json())

 
router.get('/', async (req, res) => {
try {
    const products = await Product.find()
    res.json(products)
} catch (err) {
    console.error('Erreur lors de la récupération des produits :', err)
    res.status(500).json({error: 'Server error'})
}
})

router.get('/:productRef', async (req, res) =>  {
    try {
        const productRef = req.params.productRef   
        const product = await Product.find({productRef})
        if(!product) {
            res.status(404).json({error : "Product not find"})
        }
        res.json(product)
    }catch (err) {
        console.error('Error lors de la récupération du produit : ', err)
        res.status(500).json({error : "Server Error"})
    } 
})

export default router