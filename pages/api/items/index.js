import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();

  const token = await getToken({ req: request });
  const userId = token?.sub;
  console.log("Extracted userId:", userId);

  if (!userId) {
    return response
      .status(401)
      .json({ message: "Unauthorized: No user ID found" });
  }

  if (request.method === "GET") {
    const items = await Item.find({ owner: userId }).sort({ createdAt: -1 });
    console.log("FETCHED ITEMS:", items);
    return response.status(200).json(items);
  }

  if (request.method === "POST") {
    try {
      const newItem = await Item.create({ ...request.body, owner: userId });
      console.log("CREATED ITEM:", newItem);
      return response.status(201).json(newItem);
    } catch (error) {
      console.error("ERROR CREATING ITEM:", error);
      return response.status(400).json({ error: error.message });
    }
  }
  return response.status(405).json({ error: "Method not allowed." });
}
