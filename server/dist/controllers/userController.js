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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersById = exports.getAllUsers = void 0;
const db_1 = require("../database/db");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.pool.query('SELECT * FROM users');
    if (users) {
        return res.status(200).json(users.rows);
    }
    else {
        return res.status(403).json({ message: 'no existen usuarios' });
    }
});
exports.getAllUsers = getAllUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const user = yield db_1.pool.query('SELECT * FROM users where id = $1', [id]);
    if (user) {
        return res.status(200).json(user.rows);
    }
    else {
        res.status(403).json({ message: 'no existe el usuario buscado' });
    }
});
exports.getUsersById = getUsersById;
