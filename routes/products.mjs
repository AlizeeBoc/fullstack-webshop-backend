import express, { json } from "express"
import { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/productsController.mjs"
import authenticateUser from "../middleware/authenticateUser.mjs"
import checkRole from "../middleware/checkRole.mjs"
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:productId', getProductById)
router.post("/add-product", authenticateUser, checkRole(["admin", "employee"]), addProduct);
router.delete("/:productId", authenticateUser, checkRole(["admin", "employee"]), deleteProduct);
router.patch("/:productId", authenticateUser, checkRole(["admin", "employee"]), updateProduct);

export default router

//// GET all products
//router.get("/", async (req, res) => {
//  try {
//    const products = await Product.find()
//    res.json(products)
//  } catch (err) {
//    console.error("Error while retrieving products :", err)
//    res.status(500).json({ error: "Server error" })
//  }
//})

//// Get a specific product
//router.get("/:productId", async (req, res) => {
//  try {
//    const reference = req.params.productId
//    const product = await Product.find({ reference })
//    if (!product) {
//      res.status(404).json({ error: "Product not find" })
//    }
//    res.json(product)
//  } catch (err) {
//    console.error("Error while retrieving the product:", err)
//    res.status(500).json({ error: "Server Error" })
//  }
//})

//// Add a product
//router.post("/add-product", authenticateUser, async (req, res) => {
//    //  manque info session stor age
//  try {
//    const referenceExists = await Product.findOne({ reference: req.body.reference });
//    if (referenceExists) {
//      return res.status(400).send("Product with the same reference already exists");
//    }

//    const nameExists = await Product.findOne({ name: req.body.name });
//    if (nameExists) {
//      return res.status(400).send("Product with the same name already exists");
//    }

//    const product = new Product({
//      reference: req.body.reference,
//      name : req.body.name,
//      description: req.body.description,
//      price: req.body.price,
//      image : req.body.image
//    })

//    const newProduct = await product.save()
//    res.send(newProduct)
//  } catch (err) {
//    console.error("Error creating the product", err)
//    res.status(500).send("Internal Server Error")
//  }
//})

//// DELETE a product
//router.delete("/:productId", authenticateUser, async (req, res) => {
//  const productId = req.params.productId
//  try {
//    const removedProduct = await Product.deleteOne({ reference : productId})
//    if (removedProduct.deletedCount === 0) {
//      return res.status(404).json({error : 'Product not find'})
//    }
//    res.json({ message : 'Product deleted successfully'})
//  } catch (error) {
//    console.error('Error while deleting the product:', error)
//    res.status(500).json({error : 'Server error'})
//  }
//})

////Update a product
//router.patch('/:productId', authenticateUser, async(req, res) => {
//  const productId = req.params.productId
//  const updatedFields = req.body
//  ////const updatedFields = req.body
//  ////const productRef = req.body.reference
//  //const productName = req.body.name 
//  //const productDescription = req.body.description
//  ////const productPrice = req.body.price
//  ////const productPicture = req.body.pictureUrl
//  try {
//    const updatedProduct = await Product.updateOne(
//      { reference : productId},
//      { $set: updatedFields },
//      //{$set: { name : productName, description : productDescription}},
//      { new : true } // option to returns the updated doc
//    )
//    if (!updatedProduct) {
//      return res.status(404).json({error: 'Product not found'})
//    }
//    res.json(updatedProduct)
//  } catch (error) {
//    console.error('Error Updating the product:', error)
//    res.status(500).json({ error : 'Server Error'})
//  }
//})

//export default router
