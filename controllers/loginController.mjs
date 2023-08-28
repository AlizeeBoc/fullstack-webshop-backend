import bcrypt from "bcrypt";
import User from "../Models/User.mjs";
import jwt from "jsonwebtoken"



const loginUser = async (req, role, res) => {
    const { email, password } = req.body
    try {
    // Check if an user exists for this email
    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
    
    // Check the role
    if (user.role !== role) {
        return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        });
    }

   // Compare the passwords
   const passwordMatch = await bcrypt.compare(password, user.password)

   if (!passwordMatch) {
    return res.status(401).json({message:'Incorrect password'})
   }

   // If checkPassword : generate a JWT and send it to the front
   const accesToken = jwt.sign(
    { 
        name: user.name,
        email : user.email,
        role : user.role
    }, 
    process.env.SECRET_KEY, 
    { expiresIn: '3 days' }
    )

    // Return the user_id & accesToken
   res.status(201).json({ userId: user._id , accesToken, message: "You are now logged in."})
   
    } catch (error) {
        console.error('Error while logging in', error)
        res.status(500).json({message: 'Server Error'})
    } 
}

export default loginUser
    