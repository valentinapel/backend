import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/kitchenOrder.controller.js";
import {
    verifyRoleWaitress,
    verifyRoleCook, verifyOrderAccessKitchen
} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of kitchen order
router.post('/:tableid', verifyRoleWaitress, createKitchenOrder); //RUOLO CAMERIERE - done
router.get('/', verifyOrderAccessKitchen, getAllOrders); //RUOLO CUOCO,CAMERIERE,CASSIERE
router.delete('/:id', verifyOrderAccessKitchen, deleteOrder);//RUOLO CUOCO,CAMERIERE,CASSIERE
router.put('/:id/setReady', verifyRoleCook, setToReady);//RUOLO CUOCO - done
router.put('/:id/deliver', verifyRoleWaitress, deliver); //RUOLO CAMERIERE - done

export default router;