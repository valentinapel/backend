import express from "express";
import {
    createDrink,
    createFood,
    createTable,
    getAllDrinks,
    getAllFoods,
    getAllTables,
    updateTable,
    clearOrders,
    setOccupied
} from "../controllers/restaurant.controler.js";

const router= express.Router();

//routing for the creation function
router.post('/createDrink', createDrink);
router.post('/createFood', createFood);
router.post('/createTable', createTable);

//routing for the get function
router.get('/getAllDrinks', getAllDrinks);
router.get('/getAllFoods', getAllFoods);
router.get('/getAllTables', getAllTables);

//route for the updating of the table occupied=false->true
router.put('/update/:id', updateTable);

router.post('/clearOrders', clearOrders);
router.post('/setOccupied', setOccupied)

export default router;