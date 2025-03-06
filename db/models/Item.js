import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  comment: { type: String, required: false },
  isPurchasable: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
