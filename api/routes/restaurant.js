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
import {verifyAdmin, verifyUser, verifyToken, verifyRoleWaitress, verifyOrderAccess} from "../utils/verifyToken.js";

const router= express.Router();

//routing for the creation function
router.post('/drink/', verifyAdmin, createDrink);
router.post('/food/', verifyAdmin, createFood);
router.post('/table/', verifyAdmin, createTable);

//routing for the get function
router.get('/drink/', verifyOrderAccess, getAllDrinks); //RUOLO CAMERIERE, CASSIERE - done
router.get('/food/', verifyOrderAccess, getAllFoods); //RUOLO CAMERIERE, CASSIERE - done
router.get('/table/', verifyToken, getAllTables);//RUOLO BARISTA,CUOCO, CAMERIERE,CASSIERE - done

router.put('/table/:id', verifyToken, updateTable); //NON VIENE USATO

// Delete all orders for a table and set it to not occupied
router.put('/table/:id/clearOrders', verifyAdmin, clearOrders);
// Set a table to occupied
router.put('/table/:id/setOccupied', verifyRoleWaitress, setOccupied); //RUOLO CAMERIERE

export default router;