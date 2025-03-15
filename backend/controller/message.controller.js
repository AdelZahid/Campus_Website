import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current logged-in user

    // Find or create a conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the message to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save the conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get messages for a conversation
export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // Current logged-in user

    // Find the conversation and populate the messages
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // Return an empty array if no conversation exists
    }

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Save a message to the database
export const saveMessageToDatabase = async (data) => {
  try {
    const { senderId, receiverId, message } = data;

    // Save the message to the database
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();
    console.log("Message saved to database:", newMessage);
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
};
