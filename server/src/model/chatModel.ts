import mongoose, { Schema, Document, Model } from 'mongoose';

interface Chat extends Document {
  participants: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'studentModel', // Reference to your student model
    },
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tutorModel', // Reference to your tutor model
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage', // Reference to your ChatMessage model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatModel: Model<Chat> = mongoose.model<Chat>('Chat', chatSchema);

export default ChatModel;
