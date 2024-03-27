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
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";

const router= express.Router();

//routing for the creation function
router.post('/drink/', verifyAdmin, createDrink);
router.post('/food/', verifyAdmin, createFood);
router.post('/table/', verifyAdmin, createTable);

//routing for the get function
router.get('/drink/', verifyToken, getAllDrinks);
router.get('/food/', verifyToken, getAllFoods);
router.get('/table/', verifyToken, getAllTables);

router.put('/table/:id', verifyToken, updateTable);

// Delete all orders for a table and set it to not occupied
router.put('/table/:id/clearOrders', verifyToken, clearOrders);
// Set a table to occupied
router.put('/table/:id/setOccupied', verifyToken, setOccupied);

export default router;