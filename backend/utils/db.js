import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
//MongoDB connection
const connectDb = mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connected"))
.catch(error => console.error("MongoDB error: ", error));

 
export default connectDb;