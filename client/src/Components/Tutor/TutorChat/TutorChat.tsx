import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // Import Axios
import { io } from "socket.io-client"; // Import Socket.io
import { selectTutor } from "../../../features/tutorSlice/tutorSlice";
import { selectUser } from "../../../features/userSlice/userSlice";
import { BaseUrl } from "../../../Api";
import { setChatId, selectChatId } from "../../../features/userSlice/chatSlice";
import { useDispatch } from "react-redux";


interface ChatMessage {
  text: string;
  sender: string;
  message: string;
  role: string;
  timestamp: number;
}


function TutorChat() {
  const socket = io("http://localhost:5000");

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const tutor = useSelector(selectTutor);

  const tutorId = tutor?._id;
  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);
  const dispatch = useDispatch();

  console.log(chatId, "tutor side chat");
  
  const studentId = user?.user?._id;

 // Listener for new messages
 socket.on("newMessage", (message) => {
  console.log("Received new message in chat ID:", message.chatId);
  setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
});
  

useEffect(() => {
  if (chatId) {
    // If chatId is already available, join the chat using it.
    socket.emit('join', chatId);
    fetchChatHistory(chatId);
  }

}, []);

 

  const fetchChatHistory = async (chatId: string) => {
    try {
      console.log(chatId, "id anney");
      const response = await axios.get(`${BaseUrl}/api/chat/history/${chatId}`);
      console.log(studentId, "studid");
      if (response.status === 200) {
        console.log("Chat history retrieved:", response.data);
  
        // Dispatch the setChatId action with the chatId value on the tutor's side
        dispatch(setChatId(chatId)); // This should set the chatId for the tutor as well
  
        setChatHistory(response.data);
      } else {
        console.error("Error fetching chat history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  
  console.log(chatHistory, "History");

  const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    if (message.trim() === "") {
      return; // Don't send empty messages
    }
    console.log("chatId:", chatId); // Add this line to check the value

    try {
      // Make an API request to send a message using Axios
      const response = await axios.post(
        "http://localhost:5000/api/chat/message",
        {
          chatId,
          sender: tutorId,
          role: "tutor",
          recipient: studentId, // Add the recipient field
          message,
        }
      );

      if (response.status === 201) {
        console.log("Message sent successfully:", response.data);
      } else {
        console.error("Error sending message:", response.statusText);
      }
      // Emit 'message' event to the server
      socket.emit("message", { chatId, message });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Update the chat history with the sent message
    const newMessage: ChatMessage = {
      text: message,
      sender: "tutor",
      timestamp: Date.now(),
      message: "",
      role: "",
    };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    console.log(chatHistory, "history");

    // Clear the input field
    setMessage("");
  };
  const [users] = useState([
    {
      name: "User 1",
      image: "https://via.placeholder.com/40",
      message: "Hello there!",
    },
    {
      name: "User 2",
      image: "https://via.placeholder.com/40",
      message: "Hi, how can I help you?",
    },
    {
      name: "User 3",
      image: "https://via.placeholder.com/40",
      message: "Hey!",
    },
    {
      name: "User 4",
      image: "https://via.placeholder.com/40",
      message: "Good day!",
    },
  ]);

  return (
    <div className="flex h-screen">
      {/* Left side with user list */}
      <div className="w-1/3 p-6 border-r border-gray-200">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <ul className="mt-2 space-y-4">
            {/* Display a list of random users */}
            {users.map((user, index) => (
              <li key={index} className="flex items-center space-x-3">
                <img
                  src={user.image}
                  alt={`${user.name}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side with user profile and chat interface */}
      <div className="w-2/3 p-6">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          {/* Display user profile */}
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">Anderson Vanhron</span>
              </div>
              <span className="text-lg text-gray-600">Junior Developer</span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className={`flex flex-col space-y-4 p-3 overflow-y-auto ${
            chatHistory.length
              ? "scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              : ""
          }`}
        >
          {/* Display chat messages here */}
          {chatHistory.map((chatMessage, index) => (
            <div key={index}>
              <strong>{chatMessage.role}</strong> {chatMessage.message}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 w-3/5 bg-white border-t-2 border-gray-200 px-4 py-3">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span>
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={handleSendMessage}
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorChat;
