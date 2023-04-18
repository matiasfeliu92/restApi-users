"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const userRouter = (0, express_1.Router)();
const userController = new users_controller_1.default();
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
exports.default = userRouter;
