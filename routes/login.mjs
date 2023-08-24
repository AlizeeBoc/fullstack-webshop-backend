import express from "express"
const router = express.Router()
import bodyParser from "express"
router.use(bodyParser.json())
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


 
export default router