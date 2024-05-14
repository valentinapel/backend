import mongoose, {Schema} from 'mongoose';
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
        isBartender:{
            type:Boolean,
            default:false
        },
        isWaitress:{
            type:Boolean,
            default:false
        },

        roles:  [{ type: mongoose.Types.ObjectId, ref: 'Role' }]


},
    {
        //will store the created updated date for us
        timestamps:true
    }
);
export default mongoose.model("User", UserSchema);