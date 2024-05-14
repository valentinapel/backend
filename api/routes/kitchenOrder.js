import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/kitchenOrder.controller.js";
import {verifyAdmin, verifyUser, verifyToken} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of kitchen order
router.post('/:tableid', verifyToken, createKitchenOrder); //RUOLO CAMERIERE
router.get('/', verifyToken, getAllOrders); //RUOLO CUOCO,CAMERIERE,CASSIERE
router.delete('/:id', verifyToken, deleteOrder);//RUOLO CUOCO,CAMERIERE,CASSIERE
router.put('/:id/setReady', verifyToken, setToReady);//RUOLO CUOCO
router.put('/:id/deliver', verifyToken, deliver); //RUOLO CAMERIERE

export default router;