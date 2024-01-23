import express from "express";
import {createBarOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/BarOrder.controller.js";

const router= express.Router();

//routing for crud operation of bar order
router.post('/create', createBarOrder);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);
router.post('/deliver', deliver);

export default router;
