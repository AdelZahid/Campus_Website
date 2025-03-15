import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import "./AddFriendDialog.css";

export default function AddFriendButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        className="add-friend-button"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Add friend"
      >
        <UserPlus />
      </button>

      {isDialogOpen && (
        <AddFriendDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}

export function AddFriendDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("/api/user/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add friend");
      }

      const data = await response.json();
      console.log("Friend added successfully:", data);

      // Update the UI or refetch the friends list
      alert("Friend added successfully!");
      onClose();

      // Optionally, refetch the friends list
      queryClient.invalidateQueries(["friends"]); // Invalidate the friends query to refetch data
    } catch (error) {
      console.error("Error adding friend:", error.message);
      alert(
        error.message || "Failed to add friend. They might already be added."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <UserPlus className="dialog-header-icon" />
          <h2 className="dialog-title">Add Friend</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="dialog-input"
            placeholder="Enter friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="dialog-actions">
            <button
              type="button"
              className="dialog-button dialog-button-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="dialog-button dialog-button-confirm"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
