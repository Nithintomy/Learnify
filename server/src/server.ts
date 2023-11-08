import express from 'express';
import './connection/connection'; // Importing the database connection setup
import studentRouter from './Routes/StudentRouter/studentRouter';
import tutorRouter from './Routes/TutorRouter/tutorRouter';
import adminRouter from './Routes/AdminRouter/adminRouter';
import dotenv from 'dotenv'
import cors from 'cors'
import paymentRouter from './Routes/PaymentRouter/Payment';
import http from 'http'
import {Server} from 'socket.io'
import ChatRouter from './Routes/ChatRouter/ChatRoute';



const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    },
  });




dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000;





app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/student',studentRouter)
app.use('/tutor',tutorRouter)
app.use('/admin',adminRouter)
app.use('/api/checkout',paymentRouter)
app.use('/api/chat',ChatRouter)
// app.use('/api/message',messageRouter)

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (chatId) => {
    socket.join(chatId);
  });

  socket.on('message', (data) => {
    io.to(data.chatId).emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));