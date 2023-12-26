import mongoose, {Schema} from 'mongoose';

const KitchenOrderSchema =new Schema(
    {

        cod:{
            type: String,
            required:true,

        },

        table: { type: mongoose.Types.ObjectId, ref: 'Table' },

        ready:{
            type: Boolean,
            required: true,
        },

        foods: [{ type: mongoose.Types.ObjectId, ref: 'Food' }],

        date: { type: Date, default: Date.now }


    }

);

export default mongoose.model("KitchenOrder", KitchenOrderSchema);