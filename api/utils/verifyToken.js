import jwt from 'jsonwebtoken';
import {CreateError} from "./error.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next(CreateError(401, "You are not authenticated"));
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err)
            return next(CreateError(403, "Token is not valid"));

        // Carica i ruoli dell'utente
        try {
            const userWithRoles = await User.findById(user.id).populate('roles');
            if (!userWithRoles)
                return next(CreateError(404, "User not found"));

            req.user = {
                id: user.id,
                username: userWithRoles.username,
                email: userWithRoles.email,
                roles: userWithRoles.roles, //.map(role => role.name), questa se voglio solo la stringa
                isAdmin: userWithRoles.isAdmin
            };

            next();
        } catch (error) {
            return next(CreateError(500, "Internal server error"));
        }
    });
};


export const verifyTokenDEprecated=(req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
        return next(CreateError(401,"You are not authenticated"));
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err)
            return next(CreateError(403,"Token is not valid"));
        req.user=user;
        next();
    })
}

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,()=>{
        // solo req.user.id === req.params.id || req.user.isAdmin se voglio inserire io l'id
        if(req.user.id || req.user.isAdmin){
            req.params.id = req.user.id;
            next();
        }else{
            return next(CreateError(403, "you are not authorized"))
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