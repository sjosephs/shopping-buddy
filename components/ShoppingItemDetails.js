import { useState } from "react";
import Image from "next/image";
import AddItemForm from "@/components/AddItemForm";

export default function ShoppingItemDetails({ item, id, mutate }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleEditItem(updatedData) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error("Update failed:", response.status);
      return;
    }

    setIsEditing(false); // Close the modal after saving
    await mutate();
  }

  return (
    <div>
      <Image src={item.imageUrl} alt={item.name} width={400} height={300} />
      <h1>{item.name}</h1>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {item.category}</p>
      <p>Comment: {item.comment}</p>

      <button onClick={() => setIsEditing(true)}>Edit</button>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setIsEditing(false)}>✖ Close</button>
            <AddItemForm
              onSubmit={handleEditItem}
              closeModal={() => setIsEditing(false)}
              initialValues={item}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 80%;
        }
        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
