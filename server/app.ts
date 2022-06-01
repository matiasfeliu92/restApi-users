import express from 'express'
import morgan from 'morgan'
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
    console.log("Server on port ", process.env.PORT || 3000)
})

export default app