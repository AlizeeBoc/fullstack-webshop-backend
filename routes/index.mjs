import express from "express"
const router = express()

import productRouter from "./products.mjs"
router.use('/products', productRouter)
import cartRouter from "./carts.mjs"
router.use("/cart", cartRouter)
import loginRouter from "./login.mjs"
router.use('/login', loginRouter)

import registerRouter from "./register.mjs"
router.use('/register', registerRouter)

export default router