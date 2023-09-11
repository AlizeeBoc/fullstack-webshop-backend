import paypal from "@paypal/checkout-server-sdk"
import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(express.json())
const Environment = 
    provess.env.NODE_ENV === "production"
        ?   paypal.core.LiveEnvironment
        :   paypal.core.SandboxEnvironment

const paypalClient = new paypal.core.PayPalHttpClient (
    new Environment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    )
)

