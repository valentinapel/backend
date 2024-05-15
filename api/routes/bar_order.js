import express from "express";
import
{
    createBarOrder,
    getAllOrders,
    deleteOrder,
    setToReady,
    deliver
} from "../controllers/BarOrder.controller.js";
import
{
    verifyRoleBartender,
    verifyRoleWaitress,
    verifyOrderAccess
} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of bar order
router.post('/:tableid', verifyRoleWaitress, createBarOrder); //RUOLO CAMERIERE - done
router.get('/', verifyOrderAccess, getAllOrders); //RUOLO BARISTA,CAMERIERE,CASSIERE - done
router.delete('/:id', verifyOrderAccess, deleteOrder);//RUOLO CAMERIERE, BARISTA,CASSIERE - done
router.put('/:id/setReady', verifyRoleBartender, setToReady); //RUOLO BARISTA - done
router.put('/:id/deliver', verifyRoleWaitress, deliver); //RUOLO BARISTA, CAMERIERE - done

export default router;
