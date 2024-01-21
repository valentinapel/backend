import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/kitchenOrder.controller.js";

const router= express.Router();

router.post('/create', createKitchenOrder);
router.get('/all', getAllOrders);
router.post('/delete', deleteOrder);
router.post('/setReady', setToReady);
router.post('/deliver', deliver);

export default router;