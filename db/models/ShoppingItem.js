import mongoose from "mongoose";
const { Schema } = mongoose;

const shoppingItemSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  comment: { type: String, required: false },
});

const shoppingItem =
  mongoose.models.shoppingItem ||
  mongoose.model("Shopping Item", shoppingItemSchema);

export default shoppingItem;
