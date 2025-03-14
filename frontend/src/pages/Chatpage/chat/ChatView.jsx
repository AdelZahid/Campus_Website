import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Send } from "lucide-react";
import MessageCard from "../chat/MessageCard"; // Adjust path as needed
import useWebSocket from "../chat/socket"; // Adjust path as needed
import "./ChatView.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function ChatView({ user, onClose }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages", user.id],
    queryFn: async () => {
      const res = await fetch(`/api/messages/${user.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      return res.json();
    },
  });

  const { sendMessage } = useWebSocket((data) => {
    if (data.type === "new_message" && data.message.toId === user.id) {
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
    if (!newMessage.trim()) return;

    sendMessage({
      type: "message",
      fromId: currentUserId, // Replace with the current user's ID
      toId: user.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  const groupMessagesByDate = (messages = []) => {
    const groups = {};

    messages.forEach((message) => {
      const date = format(new Date(message.sent), "PP");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
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
          <h2 className="chat-user-name">{user.name}</h2>
          <div className="chat-user-status">
            {user.isOnline
              ? "Online"
              : `Last seen ${format(new Date(user.lastActive), "p")}`}
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
                isMe={message.fromId === "currentUserId"} // Replace with actual current user ID
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
