import express from'express';
import {verifyAdmin,  verifyUser} from "../utils/verifyToken.js";
import {getAllUsers, getById, getUserRole} from "../controllers/user.controller.js";

const router=express.Router();



router.get('/', verifyAdmin, getAllUsers);

router.get('/getUserData',  verifyUser, getById);

router.get('/getUserRole', verifyUser, getUserRole);

export default router;