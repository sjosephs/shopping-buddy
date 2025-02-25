import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  try {
    if (request.method === "GET") {
      const item = await Item.findById(id);
      if (!item) {
        return response.status(404).json({ message: "Item not found" });
      }
      return response.status(200).json(item);
    }

    if (request.method === "DELETE") {
      const deleteShoppingItem = await Item.findByIdAndDelete(id);
      if (!deleteShoppingItem) {
        return response.status(404).json({ message: "Item not found" });
      }
      return response
        .status(200)
        .json({ message: "Successfully deleted this item" });
    }

    if (request.method === "PUT") {
      const updatedItem = await Item.findByIdAndUpdate(id, request.body);
      if (!updatedItem) {
        response.status(404).json({ message: "Item not found" });
        return;
      }
      return response.status(200).json(updatedItem);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error." });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
