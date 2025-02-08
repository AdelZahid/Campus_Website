import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for WebSocket functionality
 * @param {function} onMessage - Callback function to handle incoming messages
 * @param {Object} options - Optional configuration for the WebSocket
 * @returns {Object} WebSocket utilities including sendMessage function
 */
export default function useWebSocket(onMessage, options = {}) {
  const {
    reconnectAttempts = 5,
    reconnectDelay = 3000,
    autoReconnect = true,
  } = options;

  const socketRef = useRef(null);
  const reconnectTriesRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);

  // Initialize WebSocket connection
  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectTriesRef.current = 0;
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");

      if (autoReconnect && reconnectTriesRef.current < reconnectAttempts) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTriesRef.current += 1;
          connect();
        }, reconnectDelay);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [onMessage, reconnectAttempts, reconnectDelay, autoReconnect]);

  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected. Message not sent:", message);
    }
  }, []);

  // Connect on mount and cleanup on unmount
  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  // Utility function to check connection status
  const isConnected = useCallback(() => {
    return socketRef.current?.readyState === WebSocket.OPEN;
  }, []);

  // Return WebSocket utilities
  return {
    sendMessage,
    isConnected,
    reconnect: connect,
    currentAttempt: reconnectTriesRef.current,
  };
}

// Example usage:
/*
const MyComponent = () => {
  const { sendMessage, isConnected } = useWebSocket((data) => {
    // Handle incoming messages
    switch (data.type) {
      case 'new_message':
        // Handle new chat message
        break;
      case 'status_update':
        // Handle user status update
        break;
      default:
        console.log('Unknown message type:', data);
    }
  }, {
    reconnectAttempts: 3,
    reconnectDelay: 2000
  });

  // Send a message
  const handleSend = () => {
    if (isConnected()) {
      sendMessage({
        type: 'message',
        content: 'Hello!',
        toId: 'user123'
      });
    }
  };

  return (
    <div>
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
};
*/
