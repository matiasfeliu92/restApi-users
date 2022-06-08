import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

async function main() {
    app.listen(port, () => {
        console.log("http://localhost:"+port)
    })
}

main()