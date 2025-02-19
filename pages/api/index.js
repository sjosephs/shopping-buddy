import dbConnect from "@/db/connect";
import shoppingItem from "@/db/models/ShoppingItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const items = await shoppingItem.find();
    return response.status(200).json(items);
  }

  if (request.method === "POST") {
    try {
      const itemData = request.body;
      await shoppingItem.create(itemData);
      return response.status(201).json({ status: "Item created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  res.status(405).json({ status: "Method not allowed." });
}
