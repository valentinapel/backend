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
    verifyOrderAccessBar, verifyOrderAccessDeliver
} from "../utils/verifyToken.js";

const router= express.Router();

//routing for crud operation of bar order
router.post('/:tableid', verifyRoleWaitress, createBarOrder); //RUOLO CAMERIERE - done
router.get('/', verifyOrderAccessBar, getAllOrders); //RUOLO BARISTA,CAMERIERE,CASSIERE - done
router.delete('/:id', verifyOrderAccessBar, deleteOrder);//RUOLO CAMERIERE, BARISTA,CASSIERE - done
router.put('/:id/setReady', verifyRoleBartender, setToReady); //RUOLO BARISTA - done
router.put('/:id/deliver', verifyOrderAccessDeliver, deliver); //RUOLO BARISTA, CAMERIERE - done

export default router;
