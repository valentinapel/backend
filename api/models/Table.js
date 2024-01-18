import mongoose, {Schema} from 'mongoose';
const TableSchema =new Schema(
    {

        name:{
            type: String,
            required: true,
            unique:true
        },

        n_seats:{
            type: Number,
            required: true,
        },
        occupied:{
            type:Boolean,
            required:true,
        },
        occupied_seats:{
            type: Number
        }


    },
    {
        //will store the created updated date for us
        timestamps:true
    }
);
export default mongoose.model("Table", TableSchema);