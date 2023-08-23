import express, { json } from "express"
const router = express()
import Product from "../Models/Product.mjs"

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    console.error("Error while retrieving products :", err)
    res.status(500).json({ error: "Server error" })
  }
})

// Get a specific product
router.get("/:productId", async (req, res) => {
  try {
    const reference = req.params.reference
    const product = await Product.find({ reference })
    if (!product) {
      res.status(404).json({ error: "Product not find" })
    }
    res.json(product)
  } catch (err) {
    console.error("Error while retrieving the product:", err)
    res.status(500).json({ error: "Server Error" })
  }
})

// Add a product
router.post("/add-product", async (req, res) => {
  try {
    const product = new Product({
      reference: req.body.reference,
      description: req.body.description,
      price: req.body.price,
      //image : filename
    })

    const newProduct = await product.save()
    res.send(newProduct)
  } catch (err) {
    console.error("Error creating the product", err)
    res.status(500).send("Internal Server Error")
  }
})

// DELETE a product
router.delete("/:productId", (req, res) => {})

export default router
