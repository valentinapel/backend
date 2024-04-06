import express from "express";
import Role from "../models/Role.js";
import {verifyAdmin} from "../utils/verifyToken.js";
import {verifyToken} from "../utils/verifyToken.js";


import {createRole, deleteRole, getAllRoles, updateRole} from "../controllers/role.controller.js";


const router= express.Router();

//routing create role on DB
router.post('/', verifyAdmin, createRole);

//routing update role on DB
router.put('/:id', verifyAdmin, updateRole);
//routing get all the role from DB
router.get('/', verifyToken, getAllRoles);
//routing delete role from db
router.delete("/:id", verifyAdmin, deleteRole);
export default router;