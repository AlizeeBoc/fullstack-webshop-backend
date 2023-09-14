import express from "express";
const router = express.Router()

import {loadStripe} from '@stripe/stripe-js';
const stripe = await loadStripe(process.env.STRIPE_KEY)

router.post("/stripe", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount : req.body.amount,
        currency:"usd"
    }, (stripeErr, stripeRes)=> {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        }else {
            res.status(200).json(stripeRes)
        }
    })
})



export default router