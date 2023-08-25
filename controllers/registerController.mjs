import bcrypt from "bcrypt";
import User from "../Models/User.mjs";

const registerUser = async (req, role, res) => {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).send({ error: "All fields are required" });
      }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ error: "This email is already registered" });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: encryptedPassword,
        role : role,
      });

      await newUser.save();
      return res.status(201).json({ message: "User added successfully!" });
    } catch (error) {
      console.error('Error while registering the user', error);
      return res.status(500).json({ error: 'Server Error' });
    }
  }


export default registerUser;
