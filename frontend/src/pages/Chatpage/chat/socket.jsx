import { useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";

export default function useWebSocket(onMessage, options = {}) {
  const {
    reconnectAttempts = 5,
    reconnectDelay = 3000,
    autoReconnect = true,
  } = options;
  const socketRef = useRef(null);
  const reconnectTriesRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//localhost:5002`; // Hardcode for now to match server
    console.log("Attempting to connect to WebSocket:", wsUrl);

    const token = Cookies.get("jwt");
    socketRef.current = new WebSocket(wsUrl); // Headers not supported natively, handled server-side

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectTriesRef.current = 0;
      if (token) socketRef.current.send(JSON.stringify({ token })); // Send token after connection
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
      if (autoReconnect && reconnectTriesRef.current < reconnectAttempts) {
        const delay = Math.min(
          reconnectDelay * reconnectTriesRef.current,
          30000
        );
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTriesRef.current += 1;
          console.log(`Reconnecting... Attempt ${reconnectTriesRef.current}`);
          connect();
        }, delay);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [onMessage, reconnectAttempts, reconnectDelay, autoReconnect]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current)
        socketRef.current.close(1000, "Component unmounted");
    };
  }, [connect]);

  const sendMessage = useCallback(
    (message) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(message));
        console.log("Message sent:", message);
      } else {
        console.warn("WebSocket is not connected. Message not sent:", message);
        connect(); // Attempt reconnect
      }
    },
    [connect]
  );

  return { sendMessage, reconnect: connect };
}
