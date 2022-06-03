import app from './app'
import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

async function main() {
    const db = await connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lz54k.mongodb.net/${process.env.DBNAME}retryWrites=true&w=majority`, ()=>{
        console.log('Base de datos conectada')
        app.listen(port, () => {
            console.log("http://localhost:"+port)
        })
    })
}

main()