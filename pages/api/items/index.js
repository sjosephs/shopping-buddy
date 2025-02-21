import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";

export default async function handler(request, response) {
await dbConnect();

  if (request.method === "GET") {
    const items = await Item.find().sort({ createdAt: -1 });
    return response.status(200).json(items);
  }

  if (request.method === "POST") {
    try {
      const newItem = await Item.create(request.body);
      return response.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  return response.status(405).json({ error: "Method not allowed." });
}
