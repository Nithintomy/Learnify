import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import axios from "axios"; // Import Axios
import { BaseUrl, UserBaseUrl } from "../../../Api";
import { useDispatch } from "react-redux";
import { setChatId } from "../../../features/userSlice/chatSlice";

interface ChatMessage {
  text: string;
  sender: string;
  message:string;
  role:string;

  timestamp: number;
}

function Chat({studentId,tutorId,courseId}:any) {
  const [localChatId, setLocalChatId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const dispatch = useDispatch();
  // Initialize the socket connection to the backend
  const socket = io('http://localhost:5000');

  // Listen for new messages
  socket.on('newMessage', (message) => {
    console.log('Received new message:', message)
    setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
  });

  useEffect(() => {
    createChat();
  }, []);

  const createChat = async () => {
    try {
      // Make an API request to create a new chat using Axios
      const response = await axios.post(`${BaseUrl}/api/chat/create`, {
        studentId,
        tutorId,
      });

      if (response.status === 201) {
        console.log(response.data.chatId, "chat respo");
        dispatch(setChatId(response.data.chatId)); // Dispatch the action to set chatId in the Redux store
        const chatId = response.data.chatId; // Obtain the chatId from the response
        setLocalChatId(chatId); // Update the localChatId
        socket.emit('join', chatId);
        fetchChatHistory(chatId);
      } else {
        console.error('Error creating chat:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const fetchChatHistory = async (chatId:any)=>{
    try {
console.log(chatId,"id anney")
      const response =await axios.get(`${BaseUrl}/api/chat/history/${chatId}`);

      if(response.status=== 200){
        console.log('Chat history retrieved:', response.data);
        setChatHistory(response.data)
      }else{
        console.error('Error fetching chat history:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error fetching chat history:', error);
      
    }
  }

  const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    if (message.trim() === "") {
      return; // Don't send empty messages
    }
    console.log("chatId:", localChatId); // Add this line to check the value
  
    try {
      // Make an API request to send a message using Axios
      const response = await axios.post('http://localhost:5000/api/chat/message', {
        chatId:localChatId,
        sender: studentId,
        role: 'student',
        recipient:tutorId,
        message,
      });
  
      if (response.status === 201) {
        console.log('Message sent successfully:', response.data);
      } else {
        console.error('Error sending message:', response.statusText);
      }
     // Emit 'message' event to the server
      socket.emit('message', { chatId:localChatId, message });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    // Update the chat history with the sent message
    const newMessage: ChatMessage = {
      text: message,
      sender: 'student',
      timestamp: Date.now(),
      message: "",
      role: ""
    };
    setChatHistory((prevHistory)=> [...prevHistory,newMessage])

    console.log(chatHistory,"history")
  
    // Clear the input field
    setMessage("");
  };



  return (
    <div className="flex h-screen">
      <div className="bg-blue-100 w-1/3">
        Contacts
      </div>
      <div className="flex flex-col bg-blue-300 w-2/3 p-2">
        <div className="flex flex-grow flex-col bg-blue-300 p-2">
        {chatHistory.map((chatMessage, index) => (
  <div key={index}>
    <strong>{chatMessage.role }</strong> { chatMessage.message}
  </div>
))}
        </div>

        <div className="flex gap-2 mx-2">
          <input
            type="text"
            name="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white border p-2 flex-grow"
            placeholder="Enter Your Message"
          />

          <button className="bg-blue-500 p-2 text-white" onClick={handleSendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
