import BarOrder from '../models/BarOrder.js'

export const createBarOrder = async (req,res,next)=>{
    try{
        if(req.body.cod && req.body.cod!==''){
            const newOrder= new BarOrder(req.body);
            await newOrder.save();
            return res.send("order for the bar created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}