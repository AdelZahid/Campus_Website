import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { User as UserIcon } from "lucide-react";
import "./ChatUserCard.css";

export default function ChatUserCard({ user, onClick }) {
  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages", "lastMessage", user.id],
    queryFn: async () => {
      const res = await fetch(`/api/messages/${user.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      return res.json();
    },
  });

  const lastMessage = messages?.[0];

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
          <div className="chat-user-header">
            <h3 className="chat-user-name">{user.name}</h3>
            {lastMessage && (
              <span className="chat-user-time">
                {format(new Date(lastMessage.sent), "p")}
              </span>
            )}
          </div>

          <p className="chat-user-message">
            {lastMessage
              ? lastMessage.type === "image"
                ? "📷 Image"
                : lastMessage.msg
              : user.about}
          </p>
        </div>

        {lastMessage && !lastMessage.read && (
          <div className="chat-user-unread" />
        )}
      </div>
    </div>
  );
}
