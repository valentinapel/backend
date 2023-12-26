import express from "express";
import {createBarOrder} from "../controllers/BarOrder.controller.js";

const router= express.Router();

router.post('/create', createBarOrder);

export default router;
