import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";


export default async function handler(request, response) {
  await dbConnect();

  const { id } = req.query;

  if (request.method === "GET") {
    try {
      const item = await Item.findById(id);
      if (!item) return response.status(404).json({ message: "Item not found" });
      response.status(200).json(item);
    } catch (error) {
      response.status(500).json({ message: "Server error" });
    }

  try {
    if (request.method === "DELETE") {
      const deleteShoppingItem = await Item.findByIdAndDelete(id);
      if (!deleteShoppingItem) {
        return response.status(404).json({ message: "Item not found" });
      }
      response.status(200).json({ message: "Successfully deleted this item" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
}
