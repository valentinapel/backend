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
router.post('/drink/create', createDrink);
router.post('/food/create', createFood);
router.post('/table/create', createTable);

//routing for the get function
router.get('/drink/all', getAllDrinks);
router.get('/food/all', getAllFoods);
router.get('/table/all', getAllTables);

router.put('/update/:id', updateTable);

// Delete all orders for a table and set it to not occupied
router.post('/clearOrders', clearOrders);
// Set a table to occupied
router.post('/table/occupied', setOccupied)

export default router;