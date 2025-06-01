//backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'
import productRoutes from './routes/productRoutes.js';
import connectDb from "./utils/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());


//Routes
app.get("/api", (req, res) =>{
    res.json({message: "Hello from Express backend using ES Modules!"});
});

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes)


//MongoDB connect
connectDb;

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});