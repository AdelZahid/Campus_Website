import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Send } from "lucide-react";
import MessageCard from "../chat/MessageCard";
import useWebSocket from "../chat/socket";
import "./ChatView.css";
import Navbar from "../../../components/Navbar/Navbar";
import Cookies from "js-cookie"; // Add this to get JWT
import { jwtDecode } from "jwt-decode";
export default function ChatView({ user, onClose }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // Get current user ID from JWT
  const token = Cookies.get("jwt");
  const decoded = token ? jwtDecode(token) : {};
  const currentUserId = decoded.userId || null;

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages", user.id],
    queryFn: async () => {
      if (!user.id) throw new Error("User ID is undefined");
      const res = await fetch(`/api/message/get/${user.id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
  });

  const { sendMessage } = useWebSocket((data) => {
    if (
      data.type === "new_message" &&
      (data.message.toId === user.id || data.message.fromId === user.id)
    ) {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", user.id] });
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !currentUserId) return;

    sendMessage({
      type: "message",
      fromId: currentUserId,
      toId: user.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  const groupMessagesByDate = (messages = []) => {
    const groups = {};
    messages.forEach((message) => {
      try {
        const date = format(new Date(message.sent), "PP");
        if (!groups[date]) groups[date] = [];
        groups[date].push(message);
      } catch (error) {
        console.error("Invalid date in message:", message.sent);
      }
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="chat-view">
      <div className="chat-header">
        <button className="chat-back-button" onClick={onClose}>
          <ArrowLeft />
        </button>
        <div className="chat-user-info">
          <h2 className="chat-user-name">{user.username}</h2>
          <div className="chat-user-status">
            {user.isOnline
              ? "Online"
              : user.lastActive
              ? `Last seen ${format(new Date(user.lastActive), "p")}`
              : "Offline"}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {Object.entries(messageGroups).map(([date, messages]) => (
          <div key={date}>
            <div className="chat-date-divider">
              <span className="chat-date-text">{date}</span>
            </div>
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                isMe={message.fromId === currentUserId}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="chat-send-button" onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
