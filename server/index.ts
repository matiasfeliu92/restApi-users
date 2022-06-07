import app from './app'
//import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000
//`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lz54k.mongodb.net/${process.env.DBNAME}retryWrites=true&w=majority`
async function main() {
    // const db = await connect("mongodb+srv://youtube_vet:VJq6w8eZ6nJFu0aQ@cluster0.fvcxm.mongodb.net/typescript-mongodb-restapiretryWrites=true&w=majority", ()=>{
    //     console.log('Base de datos conectada')
    //     app.listen(port, () => {
    //         console.log("http://localhost:"+port)
    //     })
    // })
        app.listen(port, () => {
            console.log("http://localhost:"+port)
        })
}

main()