import mongoose from "mongoose";

//MongoDB connection
const connectDb = mongoose.connect("mongodb+srv://tarkeshwarraj:U8jOyDhyUNZ04Zft@cluster0.9apdlwv.mongodb.net/p2p?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connected"))
.catch(error => console.error("MongoDB error: ", error));


export default connectDb;