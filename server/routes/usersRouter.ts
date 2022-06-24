import { Router } from "express"
import { getAllUsers, getAllUsersAndEmpress, getUsersById, updateUser } from "../controllers/userController"
const router = Router()

router.get('/', getAllUsers)
router.get('/users-with-empress', getAllUsersAndEmpress)
router.get('/:id', getUsersById)
router.put('/update/:id', updateUser)

export default router