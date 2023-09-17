import express, { json } from "express"
import { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/productsController.mjs"
import authenticateUser from "../middleware/authenticateUser.mjs"
import checkRole from "../middleware/checkRole.mjs"
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:productId', getProductById)
router.post("/add-product", authenticateUser, checkRole(["admin", "employee"]), addProduct);
router.delete("/:productId", authenticateUser, checkRole(["admin", "employee"]), deleteProduct);
router.patch("/:productId", authenticateUser, checkRole(["admin", "employee"]), updateProduct);

export default router

