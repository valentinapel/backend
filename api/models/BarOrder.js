import mongoose, {Schema} from 'mongoose';

const BarOrderSchema =new Schema(
    {

        cod:{
            type:String,
            required:true,

        },

        table: { type: mongoose.Types.ObjectId, ref: 'Table' },

        ready:{
            type: Boolean,
            required: true,
        },

        drinks: [{ type: mongoose.Types.ObjectId, ref: 'Drink' }],

        date: { type: Date, default: Date.now }


    }

);

export default mongoose.model("BarOrder", BarOrderSchema);