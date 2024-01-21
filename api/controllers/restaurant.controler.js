import Drink from "../models/Drink.js";
import Food from "../models/Food.js";
import Table from "../models/Table.js";
import KitchenOrder from '../models/KitchenOrder.js';
import BarOrder from '../models/BarOrder.js';
import {CreateSuccess} from "../utils/success.js";
import {CreateError} from "../utils/error.js";

//le funzioni di creazione servono a me per popolare DB

export const createDrink = async (req,res,next)=>{
    try{
        if(req.body.name && req.body.name!=='' && req.body.price){
            const newDrink= new Drink(req.body);
            await newDrink.save();
            return res.send("drink created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}

export const createFood = async (req,res,next)=>{
    try{
        if(req.body.name && req.body.name!=='' && req.body.price){
            const newFood= new Food(req.body);
            await newFood.save();
            return res.send("food created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}

export const createTable = async (req,res,next)=>{
    try{
        if( req.body.name && req.body.name!=='' ){
            const newTable= new Table(req.body);
            await newTable.save();
            return res.send("table created!");
        }
        else return res.status(400).send("bad request");
    }catch(error){
        return res.status(500).send("internal server error");
    }
}

export const getAllDrinks = async (req,res,next)=>{
    try{
        const drinks = await Drink.find({});
        return res.status(200).send(drinks);
    }
    catch(error){
        return res.status(500).send("internal server error");
    }
}

export const getAllFoods = async (req,res,next)=>{
    try{
        const foods = await Food.find({});
        return res.status(200).send(foods);
    }
    catch(error){
        return res.status(500).send("internal server error");
    }
}

export const getAllTables = async (req,res,next)=>{
    try{
        const tables = await Table.find({});
        return res.status(200).send(tables);
    }
    catch(error){
        return res.status(500).send("internal server error");
    }
}

export const clearOrders = async(req,res,next)=>{
    const table_id = req.body.id;
    
    try{
        if(table_id){
            const table = await Table.findOne({ '_id': table_id });
            if (!table) {
                return res.status(404).json(CreateError(404, "Table not found"));
            }

            const kitchenOrders = await KitchenOrder.findOne({ 'table': table_id });
            const barOrders = await BarOrder.findOne({ 'table': table_id });

            if (kitchenOrders) {
                await KitchenOrder.findByIdAndDelete(kitchenOrders._id);
            }
            if (barOrders) {
                await BarOrder.findByIdAndDelete(barOrders._id);
            }
            
            const updatedTable = await Table.findByIdAndUpdate(
                table._id,
                { occupied: false, occupied_seats: 0 },
                { new: true }
              );

            return res.status(200).json(CreateSuccess(200, "Orders cleared"));
        }
        else return res.status(400).json(CreateError(400, "Bad request"));
    }catch(error){
        console.log(error);
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}

export const updateTable = async (req,res,next)=>{
    try{
        const table = await Table.findById({_id: req.params.id});
        if(table){
            const newData = await Table.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new:true}
            );
            return res.status(200).send("table updated!");
        }
        else{
            return res.status(404).send("table not found!");
        }

    }catch(error){
        return res.status(500).send("internal server error");
    }
}

export const setOccupied  = async(req,res,next)=>{
    const table_id = req.body.id;
    const n_clients = req.body.n_clients;
    
    try{
        if(table_id && n_clients){
            const table = await Table.findOne({ '_id': table_id });
            if (!table) {
                return res.status(404).json(CreateError(404, "Table not found"));
            }

            const updatedTable = await Table.findByIdAndUpdate(
                table._id,
                { occupied: true, occupied_seats: n_clients },
                { new: true }
              );

            return res.status(200).json(CreateSuccess(200, "Table set as occupied"));
        }
        else return res.status(400).json(CreateError(400, "Bad request"));
    }catch(error){
        console.log(error);
        return res.status(500).json(CreateError(500, "Internal server error"));
    }
}