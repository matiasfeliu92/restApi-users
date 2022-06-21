import express, {Application} from 'express'
import {Request, Response,} from 'express'
import morgan from 'morgan'
import userRoutes from './routes/usersRouter'
import authRoutes from './routes/authRouter'
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Endpoint de prueba
app.get('/', (req: Request, res: Response) => {
    res.send('Hellooo Worlddd')
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

export default app