import { Convo } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
export const senderMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ message: "receiverId and message are required." });
    }
    let conversation = await Convo.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Convo.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
export const getAllMessage = async (req, res) => {
  try {
    const receiverId = req.params.otherUserId;
    console.log(receiverId);
    const senderId = req.id;
    console.log(senderId);
    const conversation = await Convo.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    console.log(conversation);
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};
