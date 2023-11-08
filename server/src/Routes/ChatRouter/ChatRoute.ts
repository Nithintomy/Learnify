import express from 'express'
import { accessChat,fetchChats,submitMessage,showAllMessages } from '../../controller/chatController/chatController';


const ChatRouter = express.Router();


ChatRouter.post('/',accessChat);
ChatRouter.get('/',fetchChats);
ChatRouter.post('/chatSend', submitMessage);
ChatRouter.get('/viewMessages/:chatId' , showAllMessages);
// ChatRouter.post('/group',createGroupChat);
// ChatRouter.put('/rename',renameGroup);
// ChatRouter.put('/groupremove',fetchChats);


export default ChatRouter;