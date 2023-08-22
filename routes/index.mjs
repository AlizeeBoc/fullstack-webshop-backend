import express from "express"
const router = express()

import productRouter from "./products.mjs"
router.use('/products', productRouter)

export default router