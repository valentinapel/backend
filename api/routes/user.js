import express from'express';
import {verifyAdmin,  verifyUser} from "../utils/verifyToken.js";
import {getAllUsers,  getUserData, getUserRole} from "../controllers/user.controller.js";

const router=express.Router();



router.get('/', verifyAdmin, getAllUsers);

router.get('/getUserData',  verifyUser, getUserData);

router.get('/getUserRole', verifyUser, getUserRole);

export default router;