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
const typeorm_1 = require("typeorm");
const users_models_1 = require("../models/users.models");
class UserService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // const connection = getConnection();
            const userRepository = (0, typeorm_1.getRepository)(users_models_1.User);
            const users = yield userRepository.find();
            return users;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const connection = getConnection();
            const userRepository = (0, typeorm_1.getRepository)(users_models_1.User);
            const user = yield userRepository.findOne({ where: { id } });
            if (!user) {
                return undefined;
            }
            return user;
        });
    }
}
exports.default = UserService;
