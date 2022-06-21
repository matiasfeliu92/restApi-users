"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Endpoint de prueba
app.get('/', (req, res) => {
    res.send('Hellooo Worlddd');
});
app.use('/users', usersRouter_1.default);
app.use('/auth', authRouter_1.default);
exports.default = app;
