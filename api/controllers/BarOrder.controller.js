import BarOrder from '../models/BarOrder.js';
import Table from "../models/Table.js";
import {CreateSuccess} from "../utils/success.js";
import {CreateError} from "../utils/error.js";
import KitchenOrder from '../models/KitchenOrder.js';

export const createBarOrder = async (req,res,next)=>{
    try{
        if(req.body.table){
            const newOrder= new BarOrder(req.body);
            await newOrder.save();

            next();
        }
        else return res.status(400).send("Bad request");
    }catch(error){
        console.log(error);
        return res.status(500).send("Internal server error");
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

    if(!id){
        return next(CreateError(403, 'Order ID cannot be blank'));
    }
    else{
        try {
            const deletedOrder = await BarOrder.findByIdAndDelete(id);
    
            if (!deletedOrder) {
                return next(CreateError(404, 'Order not found'));
            }

            setTableStatus(deletedOrder.table);

            return next(CreateSuccess(200, 'Order deleted successfully'));
        } catch (error) {
            return next(CreateError(500, 'Internal Server Error'));
        }
    }
}

export const setToReady = async (req,res,next)=>{
    const order_id = req.body.id;

    if(!id){
        return next(CreateError(403, 'Order ID cannot be blank'));
    }
    else{
        try {
            const order = await BarOrder.findById(id);
    
            if (!order) {
                return next(CreateError(404, 'Order not found'));
            }
            
            order.ready = true;
            await order.save();
            
            return next(CreateSuccess(200, 'Order set to ready'));
        } catch (error) {
            return next(CreateError(500, 'Internal Server Error'));
        }
    }
}

export const setTableStatus = async (req,res)=>{
    const id = req.body.table;
    if(!id){
        return res.status(403).send("Order ID cannot be blank");
    }
    else{
        try {
            
            const table = await Table.findById(id);
            if (!table) {
                return res.status(404).send("Table not found");
            }
            
            const kitchenOrders = await KitchenOrder.find({ 'table': id });
            const barOrders = await BarOrder.find({ 'table': id });

            if (!kitchenOrders && !barOrders) {
                table.occupied = false;
            }
            else{
                table.occupied = true;
            }
            
            await table.save();

            return res.status(200).json(CreateSuccess(200, "Table set correctly"));
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal server error");
        }
    }
}