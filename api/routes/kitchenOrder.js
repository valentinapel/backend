import express from "express";
import {createKitchenOrder, getAllOrders, deleteOrder, setToReady, deliver} from "../controllers/kitchenOrder.controller.js";
import {
    verifyRoleWaitress,
    verifyOrderAccess,
    verifyRoleCook
} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of kitchen order
router.post('/:tableid', verifyRoleWaitress, createKitchenOrder); //RUOLO CAMERIERE - done
router.get('/', verifyOrderAccess, getAllOrders); //RUOLO CUOCO,CAMERIERE,CASSIERE
router.delete('/:id', verifyOrderAccess, deleteOrder);//RUOLO CUOCO,CAMERIERE,CASSIERE
router.put('/:id/setReady', verifyRoleCook, setToReady);//RUOLO CUOCO - done
router.put('/:id/deliver', verifyRoleWaitress, deliver); //RUOLO CAMERIERE - done

export default router;