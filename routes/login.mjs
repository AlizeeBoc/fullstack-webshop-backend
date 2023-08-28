import express from "express"
import loginUser from "../controllers/loginController.mjs"

const router = express.Router()
router.use(express.json())

router.use(express.urlencoded({extended: true}))

router.post('/employee', async (req, res) => {
    await loginUser(req, "employee", res)
})

router.post('/admin', async (req, res) => {
    await loginUser(req,"admin", res)
})
export default router

//import express from "express"
//const router = express.Router()
//import bodyParser from "express"
//router.use(bodyParser.json())
//import User from "../Models/User.mjs"
//import bcrypt from "bcrypt"
//import jwt from "jsonwebtoken"

//router.post('/', async(req, res) => {
//    const { email, password } = req.body
//    try {
//    // Check if an user exists for this email
//    const user = await User.findOne({email: email})
//    if (!user) {
//        return res.status(401).json({ message: 'User not found' });
//      }

//   // Compare the passwords
//   const passwordMatch = await bcrypt.compare(password, user.password)

//   if (!passwordMatch) {
//    return res.status(401).json({message:'Incorrect password'})
//   }

//   // If checkPassword : generate a JWT and send it to the front
//   const accesToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
//   res.status(201).json({ userId: user._id , accesToken})
   
//    } catch (error) {
//        console.error('Error xhile logging in', error)
//        res.status(500).json({message: 'Server Error'})
//    } 
//})
 
//export default router