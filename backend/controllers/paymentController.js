//controllers/paymentController.js
import axios from "axios";
import Order from "../models/Order.js";


//Dummy database( you can replace with real DB like MongoDB/MySQL)
const orders =[];

export const createOrder = async (req, res) =>{
    const { price_amount, price_currency, pay_currency, order_id, order_description } = req.body;

if (!price_amount || !price_currency || !pay_currency || !order_id || !order_description) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

try{

    const payload = {
      price_amount,
      price_currency,
      order_id,
      order_description,
      ipn_callback_url: "https://d3a4-2401-4900-1c4b-1234.ngrok.io/api/payments/webhook",
      success_url: "http://localhost:3000/order/success",
      cancel_url: "http://localhost:3000/order/failed"
    };

    const response = await axios.post("https://api.nowpayments.io/v1/invoice",payload, {headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      }
    });

    const invoice = response.data;

    //Optional: Save to DB here
    console.log(response, {mydata: "this is response data"});
    console.log(invoice, {mydata: "this is invoice data"});

    res.status(200).json({
        success: true,
        invoice_url: invoice.invoice_url,
        invoice_id: invoice.id
    });
}catch(err){
    console.log("Error creating invoice:", err?.response?.data || err.message);
    res.status(500).json({
        success: false,
        message: "Failed to create invoice",
        error: err?.response?.data || err.message
    });
}
};



export const handleWebhook = async (req, res) => {
  const data = req.body;

  console.log(data, {mydata: "this is webhook data"});
  try {

    if (data.payment_status === "finished" || data.payment_status === "confirmed") {
      // Check if order already exists (idempotency)
      const existingOrder = await Order.findOne({ paymentId: data.payment_id });
      if (existingOrder) {
        return res.status(200).send("Order already saved");
      }

      // Save order in DB
      await Order.create({
        productId : data.productId,
        orderId: data.order_id,
        paymentId: data.payment_id,
        status: data.payment_status,
        amount: data.price_amount,
        currency: data.price_currency,
        payCurrency: data.pay_currency, // match schema field name
        userId: data.userId,
        createdAt: new Date() // assuming your schema uses createdAt
      });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("Error handling webhook");
  }

  res.status(200).send("Webhook received");
};
