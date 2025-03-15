import { useEffect, useRef, useCallback } from "react";

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
    const wsUrl = `${protocol}//${window.location.hostname}:5173`; // WebSocket server URL
    console.log("Connecting to WebSocket:", wsUrl);
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectTriesRef.current = 0; // Reset reconnect attempts
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        onMessage(data); // Call the onMessage callback
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");

      if (autoReconnect && reconnectTriesRef.current < reconnectAttempts) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTriesRef.current += 1;
          connect(); // Reconnect
        }, reconnectDelay);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [onMessage, reconnectAttempts, reconnectDelay, autoReconnect]);

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

  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected. Message not sent:", message);
    }
  }, []);

  return {
    sendMessage,
    reconnect: connect,
  };
}
