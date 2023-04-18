import {Router} from 'express'
import UserController from '../controllers/users.controller'
const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.post('/signup', userController.signUp)
userRouter.post('/signin', userController.signIn)

export default userRouter