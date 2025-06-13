// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'finished', 'failed'], default: 'pending' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  payCurrency: { type: String }, // e.g., 'btc', 'eth'
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if users exist
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
