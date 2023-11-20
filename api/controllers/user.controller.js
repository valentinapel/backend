import {CreateSuccess} from "../utils/success.js";
import User from "../models/User.js";
import {CreateError} from "../utils/error.js";

export const getAllUsers=async (req,res,next)=>{
    try{
        const users =await User.find();
        return next(CreateSuccess(200, "all users", users));
    }catch(error){
        return next(CreateError(500,"internal server error"));
    }
}

export const getById=async (req,res,next)=>{
    try{
        const user =await User.findById(req.params.id);
        if(!user)
            return next(CreateError(404,"user not found"));
        return next(CreateSuccess(200, "all users", users));
    }catch(error){
        return next(CreateError(500,"internal server error"));
    }
}