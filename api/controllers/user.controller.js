import {CreateSuccess} from "../utils/success.js";
import User from "../models/User.js";
import {CreateError} from "../utils/error.js";

// Function to get all users
export const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database, populate roles, and exclude the password field
        const users = await User.find().populate("roles", "role").select("-password");
        // Check if any users are found
        if (users.length === 0) {
            return res.status(404).json(CreateError(404, "No users found"));
        }
        return res.status(200).json(CreateSuccess(200, "All users", users));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

// Function to get user data by ID
export const getUserData = async (req, res) => {
    try {
        console.log('ID Utente:', req.params.id);
        const user = await User.findById(req.params.id).populate("roles", "role");

        console.log('Utente trovato:', user);

        if (!user) {
            console.log('Utente non trovato');
            return res.status(404).json(CreateError(404, "User not found"));
        }
        // Return the user data as a success response
        return res.status(200).json( user);
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

// Function to get user role by user ID
export const getUserRole = async (req, res) => {
    try {
        // Retrieve the user ID from the token or wherever it is stored
        const userId = req.params.id;

        // Find the user in the database, populate roles
        const user = await User.findById(userId).populate('roles');
        // Check if the user is not found
        if (!user) {
            return res.status(404).json(CreateError(404, "User not found"));
        }

        // Convert role IDs to an array of objects with only ID and role name
        const roleDetails = user.roles.map(role => ({ id: role._id, name: role.role }));
        const roles = roleDetails.length === 1 ? roleDetails[0] : roleDetails;

        // Return the roles data as a success response
        return res.status(200).json(  roles );
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
};

// Function to delete a user by user ID
export const deleteUser = async (req,res)=>{
    const user_id = req.body.id;
    // console.log('Received Id:', id);

    if(!user_id){
        return res.status(403).json(CreateError(403, "User ID cannot be blank"));
    }
    else{
        try {
            // Find and delete the user by ID
            const deletedUser = await User.findByIdAndDelete(user_id);
    
            if (!deletedUser) {
                return res.status(404).json(CreateError(404, "User not found"));
            }
    
            return res.status(200).json(CreateSuccess(200, "User deleted successfully"));
        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}