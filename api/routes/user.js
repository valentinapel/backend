import express from'express';
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js";
import {getAllUsers, getById} from "../controllers/user.controller.js";

const router=express.Router();

router.get('/',verifyAdmin, getAllUsers);

router.get('/:id', verifyUser, getById);

export default router;