// Example: message.controller.js
export const sendMessage = async (req, res) => {
  try {
    const { fromId, toId, content } = req.body;

    const message = new Message({
      fromId,
      toId,
      content,
      sent: new Date(),
      read: false,
    });

    await message.save();

    // Broadcast the message via WebSocket
    const wss = req.app.get("wss"); // Get WebSocket server instance
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "new_message", message }));
      }
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// message.controller.js
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [{ fromId: userId }, { toId: userId }],
    }).sort({ sent: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
