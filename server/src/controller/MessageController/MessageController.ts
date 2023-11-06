import { Request, Response } from 'express';
import ChatModel from '../../model/chatModel';
import MessageModel from '../../model/MessageModel';
import { io } from '../../server';
import mongoose from 'mongoose';

// Create a new chat
const createChat = async (req: Request, res: Response) => {
  console.log("Enter into chat")
  try {
    // Assuming you have user information available in req.user or req.body (e.g., user IDs for students and tutors)

    const participants = [req.body.studentId, req.body.tutorId]; // Get the user IDs for participants

    console.log(participants,"particioents") 
    const newChat = new ChatModel({
      participants,
    });

    await newChat.save();

    res.status(201).json({ chatId: newChat._id });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Could not create the chat.' });
  }
};

// Send a new message in a chat
const message = async (req: Request, res: Response) => {
  console.log("Hello")
  
  try {
    // Extract necessary data from the request, e.g., chatId, sender, role, message
    const { chatId, sender,recipient, role, message } = req.body;
    console.log('Received message data:', chatId, sender,recipient, role, message);


    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'Invalid chatId' });
    }

    const newMessage = new MessageModel({
      sender,
      recipient,
      role,
      message,
      chatId: new mongoose.Types.ObjectId(chatId), // Make sure you associate the message with the chat
    });

    console.log(newMessage,"new mess")

    await newMessage.save();


    await ChatModel.updateOne(
      { _id: chatId },
      { $push: { messages: newMessage } }
    );

    // Emit the new message to the chat room using Socket.io (you should have Socket.io set up in your server file)

    io.to(chatId).emit('newMessage', newMessage);

    res.status(201).json({ messageId: newMessage._id });
  } catch (error) {
    console.error('Error sending a message:', error);
    res.status(500).json({ error: 'Could not send the message.' });
  }
};

// Fetch chat history (messages) for a given chat
const getChatHistory = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId; // Assuming chatId is passed as a route parameter

    const messages = await MessageModel.find({ chatId });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Could not fetch chat history.' });
  }
};

export { createChat, message, getChatHistory };
