import mongoose, {Schema} from 'mongoose';

const DrinkItemSchema = new Schema({
    drink: { type: mongoose.Types.ObjectId, ref: 'Drink', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

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

        drinks: [DrinkItemSchema],

        date: { type: Date, default: Date.now }


    }

);

export default mongoose.model("BarOrder", BarOrderSchema);