import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady} from "../controllers/kitchenOrder.controller.js";

const router= express.Router();

router.post('/create', createKitchenOrder);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);

export default router;