import mongoose, { Model, Document } from "mongoose";

// Define the Message interface
interface Message extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  content: string;
  chat:mongoose.Schema.Types.ObjectId;
  timestamp: Date;
}

const chatMessageSchema = new mongoose.Schema<Message>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentModel', // Reference to your student model
  },
  content: {
    type: String,
    trim:true
  },
  chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"

  },
  
},{
  timestamps:true

});

const MessageModel: Model<Message> = mongoose.model<Message>('Message', chatMessageSchema);

export default MessageModel;
