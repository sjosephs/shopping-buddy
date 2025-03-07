import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();

  const token = await getToken({ req: request });
  const userId = token?.sub;

  const { id } = request.query;

  if (!userId) {
    return response.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    if (request.method === "GET") {
      const item = await Item.findById({ _id: id, owner: userId });
      if (!item) {
        response.status(404).json({ message: "Item not found" });
        return;
      }
      response.status(200).json(item);
    }

    if (request.method === "DELETE") {
      const deleteShoppingItem = await Item.findByIdAndDelete({
        _id: id,
        owner: userId,
      });
      if (!deleteShoppingItem) {
        response
          .status(404)
          .json({ message: "Item not found or not owned by user" });
        return;
      }
      response.status(200).json({ message: "Successfully deleted this item" });
    }

    if (request.method === "PUT") {
      const updatedItem = await Item.findByIdAndUpdate(
        { _id: id, owner: userId },
        request.body
      );
      if (!updatedItem) {
        response
          .status(404)
          .json({ message: "Item not found or not owned by user" });
        return;
      }
      response.status(200).json(updatedItem);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }

  response.status(405).json({ message: "Method not allowed" });
}
