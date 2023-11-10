"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../../controller/chatController/chatController");
const ChatRouter = express_1.default.Router();
ChatRouter.post('/', chatController_1.accessChat);
ChatRouter.get('/', chatController_1.fetchChats);
ChatRouter.post('/chatSend', chatController_1.submitMessage);
ChatRouter.get('/viewMessages/:chatId', chatController_1.showAllMessages);
// ChatRouter.post('/group',createGroupChat);
// ChatRouter.put('/rename',renameGroup);
// ChatRouter.put('/groupremove',fetchChats);
exports.default = ChatRouter;
