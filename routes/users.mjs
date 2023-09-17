import express from "express"
import { registerUser, deleteUser, updateUser, getEmployees, getEmployee } from "../controllers/usersControllers.mjs"
import authenticateUser from "../middleware/authenticateUser.mjs"
import checkRole from "../middleware/checkRole.mjs"

const router = express.Router()
router.use(express.json())

router.use(express.urlencoded({extended: true}))

// Create an admin
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
router.get('/employee', authenticateUser, checkRole(["admin"]), (req, res) => {
    getEmployees(req, res)
})

// Get employee
router.get('/employee/:userId', authenticateUser, checkRole(["admin"]), (req, res) => {
    getEmployee(req, res)
})

export default router
