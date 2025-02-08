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
      const newUser = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0], // Use part before @ as temporary name
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        about: "Hey there! I'm using this chat app",
        createdAt: new Date().toISOString(),
        isOnline: false,
        lastActive: new Date().toISOString(),
        pushToken: "",
      };

      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Invalidate and refetch users list
      await queryClient.invalidateQueries({ queryKey: ["/api/users"] });

      alert("Friend added successfully!");
      onClose();
    } catch (error) {
      alert("Failed to add friend. They might already be added.");
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
