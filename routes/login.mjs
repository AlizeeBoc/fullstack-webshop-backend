import express from "express"
import loginUser from "../controllers/loginController.mjs"

const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.post('/employee', async (req, res) => {
    await loginUser(req, "employee", res)
})

router.post('/admin', async (req, res) => {
    await loginUser(req,"admin", res)
})
export default router
