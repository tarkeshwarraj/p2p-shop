//backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js"
import connectDb from "./utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // आपका frontend का exact URL
  credentials: true,                          // Cookie भेजने की अनुमति
}));

console.log("Allowed Origin:", process.env.FRONTEND_URL);
app.use(express.json());

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || err.toString(),
  });
});


//Routes
app.get("/api", (req, res) =>{
    res.json({message: "Hello from Express backend using ES Modules!"});
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);  //http://localhost:5000/api/products/all
app.use('/api/payments', paymentRoutes );


//MongoDB connect
connectDb;

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});