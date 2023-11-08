import React, { useEffect, useState  } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Api";


interface ChatMessage {
  _id: string;
  content: string;
  sender: string;
  
}
interface Student {
  _id: string;
  studentName: string;
  photo: string;
  // Add other properties as needed
}


function Chat({studentId}:any) {
  // Initialize your states
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [chatId,setChatId]=useState([])
 


  
  

  useEffect(() => {
    axios
      .get(`${BaseUrl}/tutor/getAllStudents`)
      .then((response) => {
        // Filter out the current user from the list of students
        const filteredStudents = response.data.studentData.filter(
          (student) => student._id !== studentId._id
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
            console.log(response.data, "getchats");
            // Update chatHistory with response data here
            setChatHistory(response.data.message)
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

    console.log(selectedStudent,"studd")
    // Send the message to the backend
    axios
      .post(`${BaseUrl}/api/chat/chatSend`, {
        studentId : studentId,
        chatId :chatId,
        content: newMessage,
      })
      .then((response) => {
        console.log(response,"reespons")
        // Update the chat history with the new message
        setChatHistory([...chatHistory, response.data.message]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left side with user list */}
      <div className="w-1/3 p-6 border-r border-gray-200">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Students</h2>
          <ul className="mt-2 space-y-4">
            {students.map((student, index) => (
              <li
                key={index}
                className="flex items-center space-x-3"
                style={student === selectedStudent ? { backgroundColor: "#bdfcb8" } : {}}
                onClick={() => handleStudentSelection(student)}
              >
                <img
                  src={student?.photo}
                  alt={`${student?.studentName}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold">{student?.studentName}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      <div className="w-2/3 p-6">
  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    {selectedStudent ? (
      /* Display user profile */
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src={selectedStudent?.photo || ''} // Display selected student's photo
            alt={`${selectedStudentName}'s avatar`}
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{selectedStudentName}</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-2xl mt-1">
        Welcome to the chat
      </div>
    )}
  </div>

  <div className="chat-box space-y-2">
  {chatHistory.map((message, index) => (
    <div
      key={index}
      className={`message flex ${message.sender._id === studentId?._id ? 'justify-end' : 'justify-start'}  `}
    >
      <div
        className={`message-content bg-${message.sender._id === studentId?._id ? 'blue' : 'gray'}-500 text-white py-2 px-4 rounded-lg max-w-md relative mb-4`}
      >
        {message.content}
       
      </div>
      <div className="text-xs text-gray-500 mt-1 text-center ">
     <img
       src={message.sender.photo}
       alt={message.sender.studentName}
       className="w-6 h-6 rounded-full inline-block ml-2"
     />
       <div className="text-xs text-gray-500 ml-2 mt-1">
          {new Date(message.updatedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
    
   </div>
 
      
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
export default Chat;
