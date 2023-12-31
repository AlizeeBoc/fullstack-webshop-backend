import express from "express"
const router = express()

import productRouter from "./products.mjs"
router.use('/products', productRouter)

import cartRouter from "./carts.mjs"
router.use("/cart", cartRouter)

import loginRouter from "./login.mjs"
router.use('/login', loginRouter)

import usersRouter from "./users.mjs"
router.use('/users', usersRouter)

import contactEmailRouter from "./email.mjs"
router.use('/contact', contactEmailRouter)

export default router