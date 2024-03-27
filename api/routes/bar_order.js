import express from "express";
import {createBarOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/BarOrder.controller.js";
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of bar order
router.post('/:tableid', verifyToken, createBarOrder);
router.get('/', verifyToken, getAllOrders);
router.delete('/:id', verifyToken, deleteOrder);
router.put('/:id/setReady', verifyToken, setToReady);
router.put('/:id/deliver', verifyToken, deliver);

export default router;
