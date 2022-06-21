import { Router } from "express"
import { getAllUsers, getUsersById, updateUser } from "../controllers/userController"
const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUsersById)
router.put('/update/:id', updateUser)

export default router