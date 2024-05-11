import jwt from 'jsonwebtoken';
import {CreateError} from "./error.js";
import User from "../models/User.js";

export const verifyTokenDeprecated = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(CreateError(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(CreateError(401, "Invalid token"));
            } else if (err.name === 'TokenExpiredError') {
                return next(CreateError(401, "Token has expired"));
            } else {
                return next(CreateError(403, "Token is not valid"));
            }
        }

        // Carica i ruoli dell'utente
        try {
            const userWithRoles = await User.findById(user.id).populate('roles');
            if (!userWithRoles) {
                return next(CreateError(404, "User not found"));
            }

            req.user = {
                id: user.id,
                username: userWithRoles.username,
                email: userWithRoles.email,
                roles: userWithRoles.roles,
                isAdmin: userWithRoles.isAdmin
            };

            next();
        } catch (error) {
            return next(CreateError(500, "Internal server error"));
        }
    });
};


// Middleware to verify the authenticity of a JWT token
export const verifyToken=(req,res,next)=>{
    // Extract the token from the request body
    const token = req.header('Authorization');
    console.log('Received Token:', token);
    // Check if the token is not provided
    if(!token){
        return res.status(401).json(CreateError(401, "Unauthorized"));
    }
    else{
        // Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                console.error('Token verification error:', err);
                // Handle different types of token verification errors
                if (err.name === 'TokenExpiredError') {
                    return next(CreateError(401, 'Token has expired'));
                } else if (err.name === 'JsonWebTokenError') {
                    return next(CreateError(403, 'Token is not valid'));
                } else {
                    return next(CreateError(500, 'Internal Server Error'));
                }
            }
            req.user = user;
            next();
        })
    }
}

export const verifyUserD = (req, res, next) => {
    verifyToken(req, res, () => {

        if (req.user && (req.user.id || req.user.isAdmin)) {
            req.params.id = req.user.id;
            next();
        } else {
            return next(CreateError(403, "You are not authorized"));
        }
    });
};

// Middleware to verify if the user is authorized for a specific resource
export const verifyUser =(req,res,next)=>{
    // Use the verifyToken function to check the validity of the token
    verifyToken(req,res,()=>{
        console.log('User in verifyUser:', req.user);
        // Check if the user ID matches the requested resource's ID or if the user is an admin
        if(req.user._id === req.params._id|| req.user.isAdmin){
            next();// Continue to the next middleware or route handler
        }else{
            return res.status(401).json(CreateError(401, "Unauthorized"));
        }
    })
}

// Middleware to verify if the user is an admin
export const verifyAdmin =(req,res,next)=>{
    // Use the verifyToken function to check the validity of the token
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();// Continue to the next middleware or route handler
        }else{
            return res.status(401).json(CreateError(401, "Unauthorized"));
        }
    })
}

// Middleware to verify bartender authorization to oder
export const verifyRoleBartender = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user's roles include "bartender"
        if (req.user.roles.includes("bartender")) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(401).json(CreateError(401, "Unauthorized"));
        }
    });
};