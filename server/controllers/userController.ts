import {Request, Response} from 'express'
import {pool} from '../database/db'
import { QueryResult } from 'pg'

export const getAllUsers = async (req: Request, res: Response) => {
    const users: QueryResult = await pool.query('SELECT * FROM users')
    if(users){
        return res.status(200).json(users.rows)
    }else{
        return res.status(403).json({message: 'no existen usuarios'})
    }
}