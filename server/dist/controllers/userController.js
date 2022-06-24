"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsersById = exports.getAllUsersAndEmpress = exports.getAllUsers = void 0;
const db_1 = require("../database/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.pool.query('SELECT name, age, country, email, ocupacion FROM users ORDER BY id ASC');
        res.json(users.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.getAllUsers = getAllUsers;
const getAllUsersAndEmpress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersEmpress = yield db_1.pool.query('SELECT * FROM view1');
        res.json(usersEmpress.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.getAllUsersAndEmpress = getAllUsersAndEmpress;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield db_1.pool.query('SELECT * FROM users where id = $1', [id]);
        res.json(user.rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.getUsersById = getUsersById;
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, country, email, password, ocupacion } = req.body;
        const { id } = req.params;
        const hashPass = bcrypt_1.default.hashSync(password, 5);
        yield db_1.pool.query('UPDATE users  set name = $1, age = $2, country = $3, email = $4, password = $5, ocupacion = $7 WHERE id = $6', [name, age, country, email, hashPass, id, ocupacion]);
        res.json('new user updated');
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
