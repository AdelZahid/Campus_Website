import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import { saveMessageToDatabase } from "./controller/message.controller.js";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const users = {};

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");
  let userId;

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received:", data);

      // Handle token authentication
      if (data.token && !userId) {
        const decoded = jwt.verify(data.token, process.env.JWT_TOKEN);
        userId = decoded.userId;
        users[userId] = ws;
        ws.userId = userId;
        console.log(`User ${userId} authenticated`);
        return;
      }

      // Require authentication
      if (!userId) {
        ws.send(JSON.stringify({ error: "Authentication required" }));
        return;
      }

      // Handle chat message
      if (data.type === "message" && data.fromId && data.toId && data.content) {
        const savedMessage = await saveMessageToDatabase({
          senderId: data.fromId,
          receiverId: data.toId,
          message: data.content,
        });

        const messagePayload = {
          type: "new_message",
          message: {
            id: savedMessage._id,
            fromId: data.fromId,
            toId: data.toId,
            content: data.content,
            sent: savedMessage.sent,
          },
        };

        if (users[data.fromId])
          users[data.fromId].send(JSON.stringify(messagePayload));
        if (users[data.toId])
          users[data.toId].send(JSON.stringify(messagePayload));
      }
    } catch (error) {
      console.error("Error handling message:", error);
      ws.send(JSON.stringify({ error: "Failed to process message" }));
    }
  });

  ws.on("close", () => {
    console.log(`User ${userId} disconnected`);
    if (userId) delete users[userId];
  });

  ws.on("error", (error) => console.error("WebSocket error:", error));
});

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const startServer = async () => {
  try {
    if (!URI) throw new Error("MongoDB URI is required");
    await mongoose.connect(URI);
    console.log("MongoDB Connected");
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

startServer();
