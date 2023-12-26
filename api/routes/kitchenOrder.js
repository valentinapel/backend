import express from "express";
import {createKitchenOrder} from "../controllers/kitchenOrder.controller.js";

const router= express.Router();

router.post('/create', createKitchenOrder);

export default router;