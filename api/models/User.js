import mongoose, {Schema} from 'mongoose';
import {monitorEventLoopDelay} from "perf_hooks";
const UserSchema =new Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },

        roles:{
                type: [Schema.Types.ObjectId],
                required:true,
                ref:"Role" //reference to schema role
        }



},
    {
        //will store the created updated date for us
        timestamps:true
    }
);
export default mongoose.model("User", UserSchema);