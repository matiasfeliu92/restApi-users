import { Router } from "express"
import { getAllUsers, getUsersById } from "../controllers/userController"
const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUsersById)

export default router