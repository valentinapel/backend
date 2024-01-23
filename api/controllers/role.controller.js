import Role from "../models/Role.js";
//file for the logic of CRUD operation for the roles

// Function to create a new role
export const createRole = async (req,res,next)=>{
    try{
        // Check if the required property is provided in the request body
        if(req.body.role && req.body.role!==''){
            const newRole= new Role(req.body);
            await newRole.save();
            return res.send("role created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}

// Function to update role information
export const updateRole = async (req,res,next)=>{
    try{
        // Find the role by ID
        const role = await Role.findById({_id: req.params.id});
        if(role){
            // Update role data
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new:true}
            );
            return res.status(200).send("role updated!");
        }
        else{
            return res.status(404).send("role not found!");
        }

    }catch(error){
        return res.status(500).send("internal server error");
    }
}

// Function to get all roles
export const getAllRoles = async (req,res,next)=>{
    try{
        const roles = await Role.find({});
        return res.status(200).send(roles);
    }
    catch(error){
        return res.status(500).send("internal server error");
    }
}

// Function to delete a role
export const deleteRole =async(req,res,next)=>{
    try{
        // Get the role ID from the request parameters
        const roleId = req.params.id;
        // Find the role by ID
        const role = await Role.findById({_id: roleId});
        if(role){
            // Delete the role
            await Role.findByIdAndDelete(roleId);
            return res.status(200).send("role deleted!");
        }
        else{
            return res.status(404).send("role not found!");
        }
    }
    catch(error){
    return res.status(500).send("internal server error");
    }
}