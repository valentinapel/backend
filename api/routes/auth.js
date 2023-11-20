import express from'express';
import {login, register} from '../controllers/auth.controller.js';
const router =express.Router();

//registration routing

router.post("/register", register);
router.post("/login", login);
router.post("/register-admin", registerAdmin);


export default router;