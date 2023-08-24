import express from "express"
const router = express.Router()
import bodyParser from "express"
router.use(bodyParser.json())
import User from "../Models/User.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

router.post('/', async(req, res) => {
    const { email, password } = req.body
    try {
    // Check if an user exists for this email
    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

   const passwordMatch = await bcrypt.compare(password, user.password)

   if (!passwordMatch) {
    return res.status(401).json({message:'Incorrect password'})
   }

   // If checkPassword : generate a JWT and send it back
   const accesToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
   res.status(201).json({ userId: user._id , accesToken})
    } catch (error) {
        console.error('Error xhile logging in', error)
        res.status(500).json({message: 'Server Error'})
    } 
})
 
export default router