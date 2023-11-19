import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import {CreateError} from "../utils/error.js";
import {CreateSuccess} from "../utils/success.js";

//logic for the registration of a user
export const register = async (req,res,next)=> {
    try {
        //const role = await Role.find({role: 'User'});
        const roles = await Role.find({role: {$in: req.body.roles}});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            roles: []
        });
        for (const role of roles) {
            newUser.roles.push((await role)._id);
        }

        await newUser.save();

        return next(CreateSuccess(200, "user registered successfully"));
    }
        //res.status(200).send("user registered successfully");
    catch(error){
        return next(CreateError(400, "username or password already registered"));
    }
}

//logic for the login of a user
export const login=  async (req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            return res.status(404).send("user not found");
        }

        const isPasswordCorrect = await  bcrypt.compareSync(req.body.password, user.get("password"));
        if (!isPasswordCorrect) {
                return next(CreateError(400, "password is incorrect"));
            //res.status(400).send("password is incorrect");

        }
        return next(CreateSuccess(200, "login success"));

        //res.status(200).send("login success");

        }catch(error){
        return next(CreateError(500, "something went wong"));
        // res.status(500).send("something went wrong");
    }
}