import express from'express';
import {login, register} from '../controllers/auth.controller.js';
const router =express.Router();

//registration and login routing

router.post("/register", register);
router.post("/login", login);


export default router;