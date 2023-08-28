import jwt from 'jsonwebtoken'

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(process.env.SECRET_KEY);

  if (!authHeader) 
  return res.status(403).json({ message: "Token missing. Access denied." });
  

  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    console.log("verifying");
    if (err) return res.status(403).json( { message: 'Invalid Token'});
    req.user = decoded
    console.log(decoded); //for correct token

    next();
  });
};

export default authenticateUser