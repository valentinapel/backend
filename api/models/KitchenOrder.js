import mongoose, {Schema} from 'mongoose';

const FoodItemSchema = new Schema({
    food: { type: mongoose.Types.ObjectId, ref: 'Food', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

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
        
        delivered:{
            type:Boolean
        },

        foods: [FoodItemSchema],

        date: { type: Date, default: Date.now }


    }

);

export default mongoose.model("KitchenOrder", KitchenOrderSchema);