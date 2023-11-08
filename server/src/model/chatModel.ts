import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
       
        users: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "studentModel",
          }
        ],
        latestMessage:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
      
    },
    { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);