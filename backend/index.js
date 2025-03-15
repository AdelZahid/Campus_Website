// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import userRoutes from "./routes/user.routes.js";
// const app = express();
// dotenv.config();

// const PORT = process.env.PORT || 5173;
// const URI = process.env.MONGO_URI;

// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// try {
//   console.log("MONGODB_URI:", URI);
//   if (!URI) {
//     throw new Error("MongoDB URI is required");
//   }
//   mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("MongoDB Connected");
// } catch (error) {
//   console.log("Failed to connect", error);
// }

// // app.get("/", (req, res) => {
// //   res.send("Hello World!");
// // });
// app.use("/user", userRoutes);
// app.listen(PORT, () => {
//   console.log(`Example app listening on ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http"; // Import the http module
import { WebSocketServer } from "ws"; // Import the WebSocket library
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to MongoDB
try {
  console.log("MONGODB_URI:", URI);
  if (!URI) {
    throw new Error("MongoDB URI is required");
  }
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
} catch (error) {
  console.log("Failed to connect", error);
}

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({ server });

wss.on("listening", () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

// Make WebSocket server accessible in routes

app.set("wss", wss);

// WebSocket connection handler
// WebSocket connection handler
// In index.js
wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  // Handle incoming messages
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received message:", data);

    // Broadcast the message to the receiver
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
