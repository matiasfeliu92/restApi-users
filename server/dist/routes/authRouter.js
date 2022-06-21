"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("../controllers/userAuth");
const router = (0, express_1.Router)();
router.post('/signin', userAuth_1.signIn);
router.post('/signup', userAuth_1.signUp);
exports.default = router;
