import express from "express";
const router = express.Router();
import {handleWebhook, createOrder} from "../controllers/paymentController.js"


//Webhook route for NowPayments
router.post("/webhook", handleWebhook);

//If you want to create an order
router.post("/create-order", createOrder);

export default router;