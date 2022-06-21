import {Request, Response} from 'express'
import {pool} from '../database/db'
import { QueryResult } from 'pg'
import {User} from '../interface/usersInterface'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: QueryResult = await pool.query('SELECT * FROM users ORDER BY id ASC')
        res.json(users.rows)
    } catch (error) {
        if(error instanceof Error){
            res.status(403).json({message: error.message})
        }
    }
}

export const getUsersById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user: QueryResult = await pool.query('SELECT * FROM users where id = $1', [id])
        res.json(user.rows)
    } catch (error) {
        if(error instanceof Error){
            res.status(403).json({message: error.message})
        }
    }
}

// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const {name, age, country, email, password, ocupacion}: User = req.body
//         const hashPass = bcrypt.hashSync(password, 5)
//         await pool.query('INSERT INTO users (name, age, country, email, password, ocupacion) VALUES ($1, $2, $3, $4, $5, $6)', [name, age, country, email, hashPass, ocupacion])
//         res.json('new user registered')
//     } catch (error) {
//         if(error instanceof Error){
//             res.status(403).json({message: error.message})
//         }
//     }
// }

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {name, age, country, email, password, ocupacion}: User = req.body
        const {id} = req.params
        const hashPass = bcrypt.hashSync(password, 5)
        await pool.query('UPDATE users  set name = $1, age = $2, country = $3, email = $4, password = $5, ocupacion = $7 WHERE id = $6', [name, age, country, email, hashPass, id, ocupacion])
        res.json('new user updated')
    } catch (error) {
        if(error instanceof Error){
            res.status(403).json({message: error.message})
        }
    }
}