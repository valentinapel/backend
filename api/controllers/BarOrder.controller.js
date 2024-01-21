import BarOrder from '../models/BarOrder.js';
import {CreateSuccess} from "../utils/success.js";
import {CreateError} from "../utils/error.js";

export const createBarOrder = async (req,res,next)=>{
    try{
        if(req.body.table){
            const table_id = req.body.table;
            const barOrders = await BarOrder.findOne({ 'table': table_id });
            if(barOrders){
                return res.status(400).json(CreateError(400, "Bad request"));
            }

            const newOrder= new BarOrder(req.body);
            await newOrder.save();

            return res.status(200).json(CreateSuccess(200, "Order created", newOrder));
        }
        else return res.status(400).json(CreateError(400, "Bad request"));
    }catch(error){
        console.log(error);
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await BarOrder.find().populate("table");
        if (orders.length === 0) {
            return res.status(404).json(CreateError(404, "No orders found"));
        }
        return res.status(200).json(CreateSuccess(200, "All orders", orders));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}

export const deleteOrder = async (req,res,next)=>{
    const order_id = req.body.id;

    if(!order_id){
        return res.status(403).json(CreateError(403, "Order ID cannot be blank"));
    }
    else{
        try {
            const deletedOrder = await BarOrder.findByIdAndDelete(order_id);
            if (!deletedOrder) {
                return res.status(404).json(CreateError(404, "Order not found"));
            }
            
            console.log(deletedOrder.table);
            req.body = {
                table: deletedOrder.table
            };
            return res.status(200).json(CreateSuccess(200, "Order deleted", deletedOrder));

        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}

export const setToReady = async (req,res)=>{
    const order_id = req.body.id;

    if(!order_id){
        return res.status(403).json(CreateError(403, "Order ID cannot be blank"));
    }
    else{
        try {
            const order = await BarOrder.findById(order_id);
    
            if (!order) {
                return res.status(404).json(CreateError(404, "Order not found"));
            }
            
            order.ready = true;
            await order.save();

            return res.status(500).json(CreateSuccess(500, "Order set to ready"));
        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}

export const deliver = async (req,res)=>{
    const order_id = req.body.id;

    if(!order_id){
        return res.status(403).json(CreateError(403, "Order ID cannot be blank"));
    }
    else{
        try {
            const order = await BarOrder.findById(order_id);
    
            if (!order) {
                return res.status(404).json(CreateError(404, "Order not found"));
            }
            
            order.delivered = true;
            await order.save();

            return res.status(500).json(CreateSuccess(500, "Order set to delivered"));
        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}