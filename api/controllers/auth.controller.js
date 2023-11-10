import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

//logic for the registration of a user
export const register = async (req,res,net)=>{
    const role= await Role.find({role:'User'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password: hashPassword,
        roles: role
    });
    await newUser.save();
    return res.status(200).send("user registered successfully");
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
                return res.status(400).send("password is incorrect");
        }
        return res.status(200).send("login success");

        }catch(error){
        return res.status(500).send("something went wrong");
    }
}