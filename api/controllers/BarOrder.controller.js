import BarOrder from '../models/BarOrder.js';
import {CreateSuccess} from "../utils/success.js";
import {CreateError} from "../utils/error.js";

// Create a new bar order
export const createBarOrder = async (req,res,next)=>{
    try{
        // Check if the request body contains a 'table' property
        if(req.body.table){
            const table_id = req.body.table;
            // Check if there is already an order for the specified table
            const barOrders = await BarOrder.findOne({ 'table': table_id });
            if(barOrders){
                return res.status(400).json(CreateError(400, "Bad request"));
            }
            // Create a new BarOrder instance and save it to the database
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

// Get all bar orders
export const getAllOrders = async (req, res) => {
    try {
        // Retrieve all bar orders from the database and populate the 'table' field
        const orders = await BarOrder.find().populate("table");
        // Check if any orders were found
        if (orders.length === 0) {
            return res.status(404).json(CreateError(404, "No orders found"));
        }
        return res.status(200).json(CreateSuccess(200, "All orders", orders));
    } catch (error) {
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}
// Delete a bar order
export const deleteOrder = async (req,res,next)=>{
    const order_id = req.body.id;
    // Check if the order ID is provided
    if(!order_id){
        return res.status(403).json(CreateError(403, "Order ID cannot be blank"));
    }
    else{
        try {
            // Find and delete the specified bar order by ID
            const deletedOrder = await BarOrder.findByIdAndDelete(order_id);
            // Check if the order was found and deleted
            if (!deletedOrder) {
                return res.status(404).json(CreateError(404, "Order not found"));
            }
            
            console.log(deletedOrder.table);
            // Return the table ID of the deleted order
            req.body = {
                table: deletedOrder.table
            };
            return res.status(200).json(CreateSuccess(200, "Order deleted", deletedOrder));

        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}

// Set a bar order to ready status
export const setToReady = async (req,res)=>{
    const order_id = req.body.id;

    if(!order_id){
        return res.status(403).json(CreateError(403, "Order ID cannot be blank"));
    }
    else{
        try {
            const order = await BarOrder.findById(order_id);
            // Check if the order was found
            if (!order) {
                return res.status(404).json(CreateError(404, "Order not found"));
            }
            // Set the order's 'ready' status to true and save it
            order.ready = true;
            await order.save();

            return res.status(500).json(CreateSuccess(500, "Order set to ready"));
        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}

// Set a bar order to delivered status
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
            // Set the order's 'delivered' status to true and save it
            order.delivered = true;
            await order.save();

            return res.status(500).json(CreateSuccess(500, "Order set to delivered"));
        } catch (error) {
            return res.status(500).json(CreateError(500, "Internal server error"));
        }
    }
}