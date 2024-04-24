"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection/connection"));
const studentRouter_1 = __importDefault(require("./Routes/StudentRouter/studentRouter"));
const tutorRouter_1 = __importDefault(require("./Routes/TutorRouter/tutorRouter"));
const adminRouter_1 = __importDefault(require("./Routes/AdminRouter/adminRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Payment_1 = __importDefault(require("./Routes/PaymentRouter/Payment"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const ChatRoute_1 = __importDefault(require("./Routes/ChatRouter/ChatRoute"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ['https://learnify.website', 'https://learnify.onrender.com'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    },
});
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use('/student', studentRouter_1.default);
app.use('/tutor', tutorRouter_1.default);
app.use('/admin', adminRouter_1.default);
app.use('/api/checkout', Payment_1.default);
app.use('/api/chat', ChatRoute_1.default);
(0, connection_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
exports.io.on('connection', (socket) => {
    socket.on('start', (studentId) => {
        socket.join(studentId); //starting a chat
        console.log(studentId, 'ith login userinte id');
    });
    socket.on('join chat', (chatRoom) => {
        socket.join(chatRoom);
        console.log('joined the room : ' + chatRoom);
    });
    socket.on('new chat message', (message) => {
        console.log('here toooo');
        const chat = message.chat;
        console.log(chat, 'ith chat');
        if (!chat.users) {
            console.log('no participants');
        }
        chat.users.forEach((user) => {
            console.log(user, '#################3');
            if (user === message.sender._id) {
                console.log('matched');
                return;
            }
            return socket.in(user).emit('message received', message);
        });
    });
    socket.on('disconnect', () => {
        // console.log('disconnected');
    });
});
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
