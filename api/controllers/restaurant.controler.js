import Drink from "../models/Drink.js";
import Food from "../models/Food.js";
import Table from "../models/Table.js";

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

export const getAllTable = async (req,res,next)=>{
    try{
        const tables = await Table.find({});
        return res.status(200).send(tables);
    }
    catch(error){
        return res.status(500).send("internal server error");
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