import express, {json} from "express"
const router = express.Router()
import bcrypt from "bcrypt"
import User from "../Models/User.mjs"

router.use(express.urlencoded({extended: true}))

router.post('/', async (req, res) => {
    const {name, email, password } = req.body

    if(!name || !email || !password)
    res.status(400).send({error : "All fields are required"})

    try {
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            res.status(409).json({error: "This email is already registered"})
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name : name,
            email: email,
            password: encryptedPassword
        })
        await newUser.save()
        res.json({ message : "User added successfully!"})
    } catch (error) {
        console.error('Error while register the user', error)
        res.status(500).json( {error : 'Server Error'})
    }
})

export default router
