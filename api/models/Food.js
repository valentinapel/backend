import mongoose, {Schema} from 'mongoose';

const FoodSchema =new Schema(
    {
        name:{
            type: String,
            required: true,
            unique:true
        },
    },
    {
        //will store the created updated date for us
        timestamps:true
    }
);


export default mongoose.model("Food", FoodSchema);

