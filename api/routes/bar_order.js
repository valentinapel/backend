import express from "express";
import {createBarOrder, getAllOrders, deleteOrder, setToReady, setTableStatus} from "../controllers/BarOrder.controller.js";

const router= express.Router();

router.post('/create', createBarOrder, setTableStatus);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);

export default router;
