import express from "express";
import {createBarOrder, getAllOrders, deleteOrder, setToReady} from "../controllers/BarOrder.controller.js";

const router= express.Router();

router.post('/create', createBarOrder);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);

export default router;
