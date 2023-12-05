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
            // Aggiungi una gestione specifica per i diversi tipi di errori JWT
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



export const verifyToken=(req,res,next)=>{
    const token = req.body.token;
    // console.log('Received Token:', token);

    if(!token){
        return next(CreateError(401,"You are not authenticated"));
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                console.error('Token verification error:', err);
                if (err.name === 'TokenExpiredError') {
                    return next(CreateError(401, 'Token has expired'));
                } else if (err.name === 'JsonWebTokenError') {
                    return next(CreateError(403, 'Token is not valid'));
                } else {
                    return next(CreateError(500, 'Internal Server Error'));
                }
            }
            return res.status(200).json({user});
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

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log('User in verifyUser:', req.user);

        if(req.user._id === req.params._id|| req.user.isAdmin){
            next();
        }else{
            return next(CreateError(403, "you arenot authorized"))
        }
    })
}


export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if( req.user.isAdmin){
            next();
        }else{
            return next(CreateError(403, "you are not authorized"))
        }
    })
}