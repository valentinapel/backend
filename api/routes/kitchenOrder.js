import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/kitchenOrder.controller.js";
import {verifyAdmin,  verifyUser, verifyToken} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of kitchen order
router.post('/:tableid', verifyToken, createKitchenOrder);
router.get('/', verifyToken, getAllOrders);
router.delete('/:id', verifyToken, deleteOrder);
router.put('/:id/setReady', verifyToken, setToReady);
router.put('/:id/deliver', verifyToken, deliver);

export default router;