import express, { json } from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { connectToDatabase } from './db/config'
import userRouter from './routes/users.routes'
const app = express()

const port=process.env.PORT || 4000

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(json());

app.use('/users', userRouter)

async function main() {
    await connectToDatabase()
    console.log('Database is connected')
    
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`http://localhost:${port}`)
    })
}

main()