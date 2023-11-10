import express from "express";
import Role from "../models/Role.js";
import {createRole, deleteRole, getAllRoles, updateRole} from "../controllers/role.controller.js";


const router= express.Router();

//routing create role on DB
router.post('/create', createRole);

//routing update role on DB
router.put('/update/:id', updateRole);
//routing get all the role from DB
router.get('/getAll', getAllRoles);
//routing delete role from db
router.delete("/deleteRole/:id", deleteRole);
export default router;