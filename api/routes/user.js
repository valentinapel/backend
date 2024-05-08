import express from'express';
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";
import {getAllUsers,  getUserData, getUserRole, deleteUser, createUser, editUser} from "../controllers/user.controller.js";

const router=express.Router();

// Routing for operations on user profiles

// Returns all users
router.get('/', verifyAdmin, getAllUsers);
// Return a single user
router.get('/:id', verifyToken, getUserData);
// Return only the role for a single user
router.get('/:id/role', verifyToken, getUserRole);
// Add a new user
router.post('/', verifyAdmin, createUser);
// Edit an existing user
router.put('/:id', verifyAdmin, editUser)
// Delete an user
router.delete('/:id', verifyAdmin, deleteUser)

export default router;