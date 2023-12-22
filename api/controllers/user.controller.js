import {CreateSuccess} from "../utils/success.js";
import User from "../models/User.js";
import {CreateError} from "../utils/error.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles", "role");
        if (users.length === 0) {
            return res.status(404).json(CreateError(404, "No users found"));
        }
        return res.status(200).json(CreateSuccess(200, "All users", users));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

export const getUserData = async (req, res) => {
    try {
        console.log('ID Utente:', req.params.id);
        const user = await User.findById(req.params.id).populate("roles", "role");

        console.log('Utente trovato:', user);

        if (!user) {
            console.log('Utente non trovato');
            return res.status(404).json(CreateError(404, "User not found"));
        }
        return res.status(200).json( user);
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
        const roles = roleDetails.length === 1 ? roleDetails[0] : roleDetails;//tolgo l'array


        return res.status(200).json(  roles );//restituisce solo i due dati. id e name di ruolo
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

export const deleteUser = async (req,res,next)=>{
    const user_id = req.body.id;
    // console.log('Received Id:', id);

    if(!id){
        return next(CreateError(403, 'User ID cannot be blank'));
    }
    else{
        try {
            const deletedUser = await User.findByIdAndDelete(id);
    
            if (!deletedUser) {
                return next(CreateError(404, 'User not found'));
            }
    
            return next(CreateSuccess(200, 'User deleted successfully'));
        } catch (error) {
            return next(CreateError(500, 'Internal Server Error'));
        }
    }
}