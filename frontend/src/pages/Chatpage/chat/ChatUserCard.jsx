import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User as UserIcon, Trash2 } from "lucide-react";
import "./ChatUserCard.css";

export default function ChatUserCard({ user, onClick }) {
  const queryClient = useQueryClient();

  // Fetch the list of friends for the current user
  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        "http://localhost:5002/api/user/getUserProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();
      return data; // Assuming the response is an array of friends
    },
  });

  // Mutation to delete a friend
  const deleteFriendMutation = useMutation({
    mutationFn: async (friendId) => {
      const token = localStorage.getItem("jwt");
      const response = await fetch("/api/user/deleteFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friendId }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete friend");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate the friends query to refetch the updated list
      queryClient.invalidateQueries(["friends"]);
    },
  });

  // Handle delete button click
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    deleteFriendMutation.mutate(user._id); // Call the delete mutation
  };

  return (
    <div className="chat-user-card" onClick={onClick}>
      <div className="chat-user-card-content">
        <div className="chat-user-avatar">
          {user.image ? (
            <img src={user.image} alt={user.name} />
          ) : (
            <div className="chat-user-avatar-fallback">
              <UserIcon />
            </div>
          )}
        </div>

        <div className="chat-user-info">
          <h3 className="chat-user-name">{user.username}</h3>
          <p className="chat-user-message">{user.about}</p>
        </div>

        {/* Delete button */}
        <button className="delete-friend-button" onClick={handleDelete}>
          <Trash2 size={16} /> {/* Use the Trash2 icon */}
        </button>
      </div>
    </div>
  );
}
