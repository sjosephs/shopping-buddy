import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const item = await Item.findById(id);
      if (!item) {
        return response.status(404).json({ message: "Item not found" });
      }
      return response.status(200).json(item);
    } catch (error) {
      return response.status(500).json({ message: "Server error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      const deleteShoppingItem = await Item.findByIdAndDelete(id);
      if (!deleteShoppingItem) {
        return response.status(404).json({ message: "Item not found" });
      }
      return response
        .status(200)
        .json({ message: "Successfully deleted this item" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal Server Error." });
    }
  }

  return response.status(405).json({ message: "Method Not Allowed" });
}
