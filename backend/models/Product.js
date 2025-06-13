import mongoose from "mongoose";

//Helper function to generate a 6-digit unique ID
function generateProductId() {
  return Math.floor(100000 + Math.random() * 9000000).toString();
}

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  role: { type: String, enum: ["Buyer", "Seller"], required: true },
  images: [String], //Store image URls of paths
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //Assuming you have a User model
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Generate unique 6-digit product ID before saving
productSchema.pre("validate", async function (next) {
  if (!this.productId) {
    let isUnique = false;
    while (!isUnique) {
      const id = generateProductId();
      const exists = await mongoose.models.Product.findOne({ productId: id });
      if (!exists) {
        this.productId = id;
        isUnique = true;
      }
    }
  }
  next();
});

export default mongoose.model("Product", productSchema);
