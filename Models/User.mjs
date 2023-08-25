
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
     type: String,
     required: true,
    },
    email: {
     type: String,
     required: true,
    },
    role: {
      type : String,
      enum : ["employee", "admin", "user"]
    },
    password: {
     type: String,
     required: true,
    },
  },
  //{ timeStamps : true }
  )
  
  const User = mongoose.model("User", usersSchema)
  
  export default User