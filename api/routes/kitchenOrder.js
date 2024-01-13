import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, setTableStatus} from "../controllers/kitchenOrder.controller.js";

const router= express.Router();

router.post('/create', createKitchenOrder, setTableStatus);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);

export default router;