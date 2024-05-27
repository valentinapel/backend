import jwt from 'jsonwebtoken';
import {CreateError} from "./error.js";
import User from "../models/User.js";

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

// Middleware to verify if the user is authorized for a specific resource
export const verifyUser =(req,res,next)=>{
    // Use the verifyToken function to check the validity of the token
    verifyToken(req,res,()=>{
        console.log('User in verifyUser:', req.user);
        // Check if the user ID matches the requested resource's ID or if the user is an admin, bartender or waitress
        if(req.user._id === req.params._id || req.user.isAdmin || req.user.isBartender || req.user.isWaitress){
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
            return res.status(401).json(CreateError(401, "Unauthorized: only Cashiers can access this resource"));
        }
    })
}

// Middleware to verify bartender authorization to oder
export const verifyRoleBartender = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a bartender
        if (req.user.isBartender) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only bartenders can access this resource"));
        }
    });
};

export const verifyRoleWaitress = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a bartender
        if (req.user.isWaitress) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only waitresses can access this resource"));
        }
    });
}

export const verifyRoleCook = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a bartender
        if (req.user.isCook) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only cooks can access this resource"));
        }
    });
}

export const verifyOrderAccess = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a waitress, cashier
        if(req.user.isWaitress || req.user.isAdmin) {
            next();
        }else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only waitresses amd cashiers can access this resource"));
        }
    });
}

export const verifyOrderAccessKitchen = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        if(req.user.isCook || req.user.isWaitress || req.user.isAdmin) {
            next();
        }else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only specific cooks, waitresses and cashiers can access this resource"));
        }
    });
}

export const verifyOrderAccessBar = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a waitress, cashier, or barman
        if (req.user.isWaitress || req.user.isAdmin || req.user.isBartender) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(403).json(CreateError(403, "Unauthorized: bartenders,waitresses and cashiers can access this resource"));
        }
    });
}

export const verifyOrderAccessDeliver = (req, res, next) => {
    // Use the verifyToken function to check the validity of the token
    verifyToken(req, res, () => {
        // Check if the user is a waitress, cashier, or barman
        if (req.user.isWaitress || req.user.isBartender) {
            next(); // Continue to the next middleware or route handler
        } else {
            return res.status(403).json(CreateError(403, "Unauthorized: Only waitresses and bartenders can access this resource"));
        }
    });
}