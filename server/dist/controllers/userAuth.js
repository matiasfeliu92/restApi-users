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
exports.signIn = exports.signUp = void 0;
const db_1 = require("../database/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, country, email, password, ocupacion } = req.body;
        const hashPass = bcrypt_1.default.hashSync(password, 5);
        const user = yield db_1.pool.query('INSERT INTO users (name, age, country, email, password, ocupacion) VALUES ($1, $2, $3, $4, $5, $6)', [name, age, country, email, hashPass, ocupacion]);
        res.json(`new user is registered`);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.pool.query('SELECT * FROM users where email = $1', [email]);
        console.log(user.rows[0]);
        if (user) {
            let validatePassword = bcrypt_1.default.compareSync(password, user.rows[0].password);
            if (validatePassword == true) {
                console.log('Welcome user');
                return res.json(user.rows[0]);
            }
            else {
                console.log('las credenciales son invalidas');
                res.status(403).json({ message: 'las credenciales son invalidas' });
            }
        }
        else {
            res.status(403).json({ message: 'no se encontro el usuario' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(403).json({ message: error.message });
        }
    }
});
exports.signIn = signIn;
