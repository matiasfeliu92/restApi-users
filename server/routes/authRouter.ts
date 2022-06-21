import { Router } from "express"
import { signUp, signIn } from "../controllers/userAuth"
const router = Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

export default router