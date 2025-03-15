import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import { saveMessageToDatabase } from "./controller/message.controller.js"; // Correct import

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({ server });

wss.on("listening", () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Handle incoming messages
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received message:", data);

      // Save the message to the database
      await saveMessageToDatabase(data);

      // Broadcast the message to all clients except the sender
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  // Handle WebSocket errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server after MongoDB connection
const startServer = async () => {
  try {
    console.log("MONGODB_URI:", URI);
    if (!URI) {
      throw new Error("MongoDB URI is required");
    }
    await mongoose.connect(URI);
    console.log("MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

startServer();
