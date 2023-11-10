import express from 'express';
import connectToDb from './connection/connection'; // Importing the database connection setup
import studentRouter from './Routes/StudentRouter/studentRouter';
import tutorRouter from './Routes/TutorRouter/tutorRouter';
import adminRouter from './Routes/AdminRouter/adminRouter';
import dotenv from 'dotenv'
import cors from 'cors'
import paymentRouter from './Routes/PaymentRouter/Payment';
import http from 'http'
import {Server} from 'socket.io'
import ChatRouter from './Routes/ChatRouter/ChatRoute';
import path from "path";
import morgan from "morgan"

 
const app = express(); 
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: 'https://learnify.website',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    },
  });




dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000;




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use('/student',studentRouter)
app.use('/tutor',tutorRouter)
app.use('/admin',adminRouter)
app.use('/api/checkout',paymentRouter)
app.use('/api/chat',ChatRouter)

connectToDb();

app.use(express.static(path.join(__dirname,"../../client/dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname,"../../client/dist/index.html"));
});

io.on('connection' , (socket) => {
  
  socket.on('start' , (studentId) => { 
      socket.join(studentId);   //starting a chat
      console.log(studentId , 'ith login userinte id');
  });

  socket.on('join chat' , (chatRoom) => { //chatroomId
      socket.join(chatRoom);
      console.log('joined the room : '  + chatRoom);
  })
  

  socket.on('new chat message', (message) => {
    console.log('here toooo');
    const chat = message.chat;
    
    console.log(chat, 'ith chat');
  
    if (!chat.users) {
      console.log('no participants'); 
    }
    chat.users.forEach((user: any) => {
      console.log(user, '#################3');
      console.log('enter ayo');
      console.log('njn messager', message.sender);
      if (user === message.sender._id) {
        console.log('matched');
        return;
      }
  
      return socket.in(user).emit('message received', message);
    });
  });
  
  socket.on('disconnect' , () => {
      // console.log('disconnected');
  });
})

server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));