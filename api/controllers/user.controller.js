import {CreateSuccess} from "../utils/success.js";
import User from "../models/User.js";
import {CreateError} from "../utils/error.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles", "role");
        return res.status(200).json(CreateSuccess(200, "All users", users));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};


export const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("roles", "role");

        if (!user) {
            return res.status(404).json(CreateError(404, "User not found"));
        }
        return res.status(200).json(CreateSuccess(200, "User found", user));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

export const getUserRole = async (req, res) => {
    try {
        // Recupera l'ID dell'utente dal token o da dove lo stai memorizzando
        const userId = req.user.id;

        // Trova l'utente nel database
        const user = await User.findById(userId).populate('roles');
        if (!user) {
            return res.status(404).json(CreateError(404, "User not found"));
        }

        // Converte gli ID dei ruoli in array di oggetti con solo l'ID e il nome del ruolo
        const roleDetails = user.roles.map(role => ({ id: role._id, name: role.role }));

        return res.status(200).json(CreateSuccess(200, "User role found", { roles: roleDetails }));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};
