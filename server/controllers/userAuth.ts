import {Request, Response} from 'express'
import {pool} from '../database/db'
import { QueryResult } from 'pg'
import {User} from '../interface/usersInterface'
import bcrypt from 'bcrypt'

export const signUp = async (req: Request, res: Response) => {
    try {
        const {name, age, country, email, password, ocupacion}: User = req.body
        const hashPass = bcrypt.hashSync(password, 5)
        await pool.query('INSERT INTO users (name, age, country, email, password, ocupacion) VALUES ($1, $2, $3, $4, $5, $6)', [name, age, country, email, hashPass, ocupacion])
        res.json(`new user is registered`)
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            res.status(403).json('user is already registered')
        }
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const {email, password}: User = req.body
        const user: QueryResult = await pool.query('SELECT * FROM users where email = $1', [email])
        //console.log(user.rows[0])
        if(user){
            let validatePassword = bcrypt.compareSync(password, user.rows[0].password)
            if(validatePassword == true){
                console.log('Welcome user')
                return res.json('Welcome user')
            }else{
                console.log('las credenciales son invalidas')
                res.status(403).json('las credenciales son invalidas')
            }
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(403).json({message: error.message})
        }
    }
}