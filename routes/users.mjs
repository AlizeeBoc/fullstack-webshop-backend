import express from "express"
//import registerUser from "../controllers/registerController.mjs"
import { registerUser, deleteUser, updateUser } from "../controllers/usersControllers.mjs"
import authenticateUser from "../middleware/authenticateUser.mjs"
import checkRole from "../middleware/checkRole.mjs"

const router = express.Router()
router.use(express.json())

router.use(express.urlencoded({extended: true}))

// Register an admin
router.post('/admin', (req, res) => {
    registerUser(req,"admin", res)
})

// Create an employee
router.post('/employee', authenticateUser, checkRole(["admin"]), (req, res) => {
    registerUser(req, "employee", res)
})

// Delete an employee
router.delete('/employee', authenticateUser, checkRole(["admin"]), (req, res) => {
    deleteUser(req, res)
})

// Update an employee
router.patch('/employee/:userId', authenticateUser, checkRole(["admin"]), (req, res) => {
    updateUser(req, res)
})

// Get all employees



export default router

//import express, {json} from "express"
//const router = express.Router()
//import bcrypt from "bcrypt"
//import User from "../Models/User.mjs"

//router.use(express.urlencoded({extended: true}))

//router.post('/', async (req, res) => {
//    const {name, email, password } = req.body

//    // Check if all the fiels are completed
//    if(!name || !email || !password)
//    res.status(400).send({error : "All fields are required"})

//    // Check if the user already exists
//    try {
//        const existingUser = await User.findOne({email: email})
//        if (existingUser) {
//            res.status(409).json({error: "This email is already registered"})
//        }
    
//        // Crypt the passsword
//        const encryptedPassword = await bcrypt.hash(password, 10)
//        const newUser = new User({
//            name : name,
//            email: email,
//            password: encryptedPassword
//        })

//        // Save new user in the DB
//        await newUser.save()
//        return res.status(201).json({ message : "User added successfully!"})
//    } catch (error) {
//        console.error('Error while register the user', error)
//        return res.status(500).json( {error : 'Server Error'})
//    }
//})

//export default router
