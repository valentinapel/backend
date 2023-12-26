import express from "express";
import {
    createDrink,
    createFood,
    createTable,
    getAllDrinks,
    getAllFoods,
    getAllTable, updateTable
} from "../controllers/restaurant.controler.js";

const router= express.Router();

//routing for the creation function
router.post('/createDrink', createDrink);
router.post('/createFood', createFood);
router.post('/createTable', createTable);

//routing for the get function
router.get('/getAllDrinks', getAllDrinks);
router.get('/getAllFoods', getAllFoods);
router.get('/getAllTable', getAllTable);

//route for the updating of the table occupied=false->true
router.put('/update/:id', updateTable);

export default router;