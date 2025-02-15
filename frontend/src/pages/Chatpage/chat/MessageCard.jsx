import { useState } from "react";
import { format } from "date-fns";
import { Check, CheckCheck, MoreVertical } from "lucide-react";
import "./MessageCard.css";

export default function MessageCard({ message, isMe }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={`message-card ${isMe ? "sent" : "received"}`}>
      <div className="message-content">
        {message.type === "text" ? (
          <p className="message-text">{message.msg}</p>
        ) : (
          <img
            src={message.msg}
            alt="Message attachment"
            className="message-image"
            loading="lazy"
          />
        )}

        <div className="message-time">
          {format(new Date(message.sent), "p")}
        </div>

        {isMe && (
          <div className="message-status">
            {message.read ? (
              <CheckCheck className="message-status-icon" />
            ) : (
              <Check
                className="message-status-icon"
                style={{ color: "#666" }}
              />
            )}
          </div>
        )}

        <div className="message-options">
          <button
            className="message-option-button"
            onClick={() => setShowOptions(!showOptions)}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
