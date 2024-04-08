import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Api";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  _id: string;
  content: string;
  sender: Student;
  updatedAt: string;
}
interface Student {
  _id: string;
  studentName: string;
  photo: string;
}

let socket: Socket;

function Chat({ studentId }: any) {
  // Initialize your states
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [chatId, setChatId] = useState([]);
  const [socketConnection, setSocketConnection] = useState<boolean>(false);

  useEffect(() => {
    socket = io("https://learnify.website", { withCredentials: true });

    socket.on("connect", () => {
      setSocketConnection(true);
    });
    socket.emit("start", studentId?._id);

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [studentId?._id]);

  console.log(socketConnection);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/tutor/getAllStudents`)
      .then((response) => {
        console.log("studyyyyyyyyyyyyyyyyddd", response.data.studentData);
        // Filter out the current user from the list of students
        const filteredStudents = response.data.studentData.filter(
          (student: any) => student._id !== studentId._id
        );
        setStudents(filteredStudents);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [studentId._id]);

  const handleStudentSelection = (student: any) => {
    setSelectedStudent(student);
    setSelectedStudentName(student.studentName);

    axios
      .post(`${BaseUrl}/api/chat`, {
        userId: studentId._id,
        oppUserId: student?._id,
      })
      .then((response) => {
        console.log(response.data.chat, "chat response");
        setChatId(response.data.chat._id);

        axios
          .get(`${BaseUrl}/api/chat/viewMessages/${response.data.chat._id}`)
          .then((response) => {
            console.log(response.data.message, "getchats");
            // Update chatHistory with response data here
            setChatHistory(response.data.message);
            console.log(chatId, "msg send");
            socket.emit("join chat", chatId);
          })
          .catch((error) => {
            console.error("Error fetching chat messages:", error);
          });
      })
      .catch((error) => {
        console.error("Error sending chat:", error);
      });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    console.log(selectedStudent, "studd");
    // Send the message to the backend
    axios
      .post(`${BaseUrl}/api/chat/chatSend`, {
        studentId: studentId,
        chatId: chatId,
        content: newMessage,
      })
      .then((response) => {
        console.log(response, "reespons");
        if (response.data.message) {
          socket.emit("new chat message", response.data.message);
          // Update the chat history with the new message
          setChatHistory([...chatHistory, response.data.message]);
          setNewMessage("");
        }
      })

      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if (!chatId || chatId !== newMessage?.chat?._id) {
        return;
      } else {
        setChatHistory([...chatHistory, newMessage]);
      }
    });
  }, [chatId, chatHistory]);

  console.log(selectedStudent, "studd");

  return (
    <div className="w-full max-w-3xl h-full">
      <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side with user list */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Students</h2>
            <ul className="mt-2 space-y-4">
              {students.map((student, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-3 ${
                    student === selectedStudent
                      ? "bg-gray-400 rounded-lg p-3"
                      : ""
                  }`}
                  onClick={() => handleStudentSelection(student)}
                >
                  <img
                    src={student?.photo}
                    alt={`${student?.studentName}'s avatar`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="text-base font-semibold">
                      {student?.studentName}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side with chat */}
        <div className="w-2/3 p-6 relative">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-400">
            {selectedStudent ? (
              /* Display user profile */
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={
                      selectedStudent?.photo ||
                      "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg"
                    }
                    alt={`${selectedStudentName}'s avatar`}
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {selectedStudentName}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xl mt-1">Welcome to the chat</div>
            )}
          </div>

          {/* Chat box */}
          <div className="chat-box h-3/4 mt-2 overflow-y-auto">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`message flex ${
                  message.sender._id === studentId?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`message-content bg-${
                    message.sender._id === studentId?._id ? "green" : "gray"
                  }-500 text-white py-2 px-4 rounded-lg max-w-md relative mb-4`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  <img
                    src={message.sender.photo}
                    alt={message.sender.studentName}
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                  <div className="text-xs text-gray-500 ml-2 mt-1">
                    {new Date(message.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          {chatId.length > 1 && (
            <div className="absolute bottom-0 left-0 w-full bg-white py-3  px-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Write your message!"
                  className="flex-grow focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4  py-2 border rounded-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="button"
                  className="m-2 btn btn-blue"
                  onClick={handleSendMessage}
                >
                  Send
                  <span>
                    <svg
                      className="w-2 h-2 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Chat;
