import KitchenOrder from '../models/KitchenOrder.js'

export const createKitchenOrder = async (req,res,next)=>{
    try{
        if(req.body.cod && req.body.cod!==''){
            const newOrder= new KitchenOrder(req.body);
            await newOrder.save();
            return res.send("order for the kitchen created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}