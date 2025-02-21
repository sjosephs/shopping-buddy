import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
