import bcrypt from "bcrypt";
import User from "../Models/User.mjs";

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const registerUser = async (req, role, res) => {
    const { name, email, password } = req.body;
    
    //Check if all the fiels are completed
    try {
      if (!name || !email || !password) {
        return res.status(400).send({ error: "All fields are required" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).send({ error: "Invalid email format" });
      }

    //Check if the user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ error: "This email is already registered" });
      }
    
      //Create a new user
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

export const deleteUser = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).send({ error: "Please, enter a name" });
    }
    const removeUser = await User.deleteOne({ name: name });

    //Check if the user has been deleted
    if (removeUser.deletedCount === 0) {
      return res.status(404).json({ error: "User not find" });
    }
    return res.json({ message : 'User deleted successfully'})

  } catch (error) {
    console.error('Error while deleting the user', error);
    return res.status(500).json({ error: 'Server Error' });
  }
}


export const updateUser = async(req, res) => {
  const userId = req.params.userId
  const updatedFields = req.body

  try {
    const updatedUser = await User.updateOne(
      { _id : userId},
      { $set: updatedFields },
      { new : true } // option to returns the updated doc
    )

    //Check if employee exists in the db
    if (!updatedUser) {
      return res.status(404).json({error: 'Employee not found'})
    }
    res.json(updatedUser)
    
  } catch (error) {
    console.error('Error Updating the employee:', error)
    res.status(500).json({ error : 'Server Error'})
  }
}


export const getEmployees = async (req, res) => {
  try {
    const employees = await User.find()
    res.json(employees)
  } catch (err) {
    console.error("Error while retrieving employees :", err)
    res.status(500).json({ error: "Server error" })
  }
}

export const getEmployee = async (req, res) => {
  try {
    const userId = req.params.userId
    const employee = await User.find({"_id" : userId})
    res.json(employee)
  } catch (err) {
    console.error('Error while retrieving user :', err)
    res.status(500).json({error : "Server error"})
  }
}




