import mongoose, { Model, Document } from "mongoose";

// Define the Message interface
interface Message extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  role: string;
  recipient: mongoose.Schema.Types.ObjectId;
  message: string;
  timestamp: Date;
}

const chatMessageSchema = new mongoose.Schema<Message>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentModel', // Reference to your student model
    required: true,
  },
  role: {
    type: String, // Role of the sender (student or tutor)
    required: true,
    enum: ['student', 'tutor'], // Specify the allowed role values
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tutorModel', // Reference to your tutor model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel: Model<Message> = mongoose.model<Message>('MessageModel', chatMessageSchema);

export default MessageModel;
