import express from "express"
const router = express()

import productRouter from "./products.mjs"
router.use('/products', productRouter)
import cartRouter from "./carts.mjs"
router.use("/cart", cartRouter)
export default router