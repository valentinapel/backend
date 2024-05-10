import express from "express";
import {createBarOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/BarOrder.controller.js";
import {verifyAdmin, verifyUser, verifyToken, verifyBarOrder} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of bar order
router.post('/:tableid', verifyToken, verifyBarOrder, createBarOrder); //RUOLO CAMERIERE
router.get('/', verifyToken, getAllOrders); //RUOLO BARISTA,CAMERIERE,CASSIERE
router.delete('/:id', verifyToken, deleteOrder);//RUOLO CAMERIERE, BARISTA,CASSIERE
router.put('/:id/setReady', verifyToken, setToReady); //RUOLO BARISTA
router.put('/:id/deliver', verifyToken, deliver); //RUOLO BARISTA, CAMERIERE

export default router;
