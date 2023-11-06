import express from 'express'
import { message,getChatHistory,createChat} from '../../controller/MessageController/MessageController';

const ChatRouter = express.Router();


ChatRouter.post('/create',createChat);
ChatRouter.post('/message',message);
ChatRouter.get('/history/:chatId',getChatHistory);

export default ChatRouter;