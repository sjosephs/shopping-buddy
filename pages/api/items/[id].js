import dbConnect from "@/db/connect";
import Item from "@/db/models/Item";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const item = await Item.findById(id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}
