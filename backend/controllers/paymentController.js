//controllers/paymentController.js
import axios from "axios";


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
      ipn_callback_url: process.env.WEBHOOK_URL || "https://nowpayments.io",
      success_url: "https://yourfrontend.com/success",
      cancel_url: "https://yourfrontend.com/cancel"
    };

    const response = await axios.post("https://api.nowpayments.io/v1/invoice",payload, {headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      }
    });

    const invoice = response.data;

    //Optional: Save to DB here
    console.log(invoice);

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


export const handleWebhook = (req, res) =>{
    const data = req.body;

    console.log("Webhook received:", data);

    const {payment_status, order_id} = data;

    //Update order status
    const order = orders.find(o => o.orderId === order_id);
    if(order){
        order.status = payment_status;
        console.log(`Order ${order_id} update to ${payment_status}`);
    }

    res.status(200).send("Webhook received");
}