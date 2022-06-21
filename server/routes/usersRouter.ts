import { Router } from "express"
import { createUser, getAllUsers, getUsersById, updateUser } from "../controllers/userController"
const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUsersById)
router.post('/create', createUser)
router.put('/update/:id', updateUser)

export default router