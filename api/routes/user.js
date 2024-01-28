import express from'express';
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";
import {getAllUsers,  getUserData, getUserRole, deleteUser} from "../controllers/user.controller.js";

const router=express.Router();


//routing for crud operation on user
router.get('/', verifyAdmin, getAllUsers);
router.get('/all', getAllUsers);
router.get('/data/:id', verifyUser,  getUserData);
router.get('/role/:id',  getUserRole);
router.post('/data/token', verifyToken);
router.post('/delete', deleteUser);

export default router;