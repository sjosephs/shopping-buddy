import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  try {
    if (request.method === "DELETE") {
      const deleteShoppingItem = await Item.findByIdAndDelete(id);
      if (!deleteShoppingItem) {
        return response.status(404).json({ message: "Item not found" });
      }
      response.status(200).json({ message: "Successfully deleted this place" });
      return;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
}
