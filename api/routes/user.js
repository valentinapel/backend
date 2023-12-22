import express from'express';
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";
import {getAllUsers,  getUserData, getUserRole, deleteUser} from "../controllers/user.controller.js";

const router=express.Router();



router.get('/', verifyAdmin, getAllUsers);

router.get('/all', getAllUsers);

router.get('/getUserData/:id', verifyUser,  getUserData);

router.get('/getUserRole',  getUserRole);

router.post('/getUserDataFromToken', verifyToken);

router.post('/delete', deleteUser);

export default router;