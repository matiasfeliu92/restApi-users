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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_models_1 = require("../models/users.models");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(users_models_1.User);
            const users = yield userRepository.find();
            res.status(200).json(users);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userRepository = (0, typeorm_1.getRepository)(users_models_1.User);
                const user = yield userRepository.findOne({ where: { id: Number(id) } });
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                }
                else {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, age, country, email, password, job_occupation } = req.body;
                const newUser = new users_models_1.User();
                newUser.name = name;
                newUser.age = age;
                newUser.country = country;
                newUser.email = email;
                newUser.password = yield bcrypt_1.default.hash(password, 10);
                newUser.job_occupation = job_occupation;
                yield (0, typeorm_1.getRepository)(users_models_1.User).save(newUser);
                console.log('new user registered');
                const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
                return res.status(201).json({
                    message: 'User created successfully',
                    user: userWithoutPassword,
                });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userRepository = (0, typeorm_1.getRepository)(users_models_1.User);
                const user = yield userRepository.findOne({ where: { email } });
                const secret = process.env.JWT_SECRET || 'defaultSecretValue';
                if (user) {
                    const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
                    if (passwordMatches) {
                        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '1h' });
                        return res.status(200).json({ message: `Welcome ${user.name}`, token: token });
                    }
                    else {
                        return res.status(401).json({ message: 'Invalid credentials' });
                    }
                }
                else {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'User not found' });
            }
        });
    }
}
exports.default = UserController;
