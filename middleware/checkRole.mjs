import User from "../Models/User.mjs";

const checkRole = (roles) => async (req, res, next) => {
    let { name } = req.body;
  
    // Retrieve employee info from DB
    const user = await User.findOne({ name });
  
    if (!roles.includes(user.role)) {
      res.status(401).json("Sorry you do not have access to this route");
    } else {
      next();
    }
  };

  export default checkRole
  