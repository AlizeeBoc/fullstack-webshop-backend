
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
     type: String,
     required: true,
    },
    email: {
     type: String,
     required: true,
    },
    password: {
     type: text,
     required: true,
    }
  })
  
  const User = mongoose.model("users", usersSchema)
  
  export default User