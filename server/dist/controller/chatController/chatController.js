"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitMessage = exports.showAllMessages = exports.fetchChats = exports.accessChat = void 0;
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const userModel_1 = __importDefault(require("../../model/userModel"));
const MessageModel_1 = __importDefault(require("../../model/MessageModel"));
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, oppUserId } = req.body;
        console.log(userId, 'user here ');
        console.log(oppUserId, "oppUserId hahah");
        if (!userId || !oppUserId) {
            console.log('UserId param not sent with the request');
            return res.sendStatus(400);
        }
        let isChat = yield chatModel_1.default.find({
            users: {
                $all: [userId, oppUserId],
            },
        })
            .populate({
            path: 'users',
            select: 'studentName photo studentEmail ',
            model: 'studentModel',
        })
            .populate('latestMessage');
        console.log("isChat", isChat);
        if (isChat.length > 0) {
            return res.status(201).json({ chat: isChat[0] });
        }
        else {
            var chatData = {
                chatName: 'sender',
                users: [userId, oppUserId],
            };
            console.log(chatData, "nnnn");
            try {
                const createdChat = yield chatModel_1.default.create(chatData);
                const FullChat = yield chatModel_1.default.findOne({ _id: createdChat._id }).populate('users', '-password');
                res.status(200).json(FullChat);
            }
            catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.accessChat = accessChat;
const fetchChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enter");
    try {
        const { user } = req.body;
        chatModel_1.default.find({ participants: { $elemMatch: { $eq: user._id } } })
            .populate('participants', '-password')
            .populate('lastMessage')
            .sort({ updatedAt: -1 })
            .then((results) => __awaiter(void 0, void 0, void 0, function* () {
            results = yield userModel_1.default.populate(results, {
                path: 'lastMessage.sender',
                select: 'studentName photo'
            });
            res.status(200).json({ results });
        }));
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
exports.fetchChats = fetchChats;
const showAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting mesage");
    try {
        console.log(req.params);
        const chatId = req.params.chatId;
        const message = yield MessageModel_1.default.find({ chat: chatId })
            .populate('sender', 'studentName photo')
            .populate('chat');
        if (!message) {
            return;
        }
        res.status(200).json({ message });
    }
    catch (error) {
        console.log(error);
    }
});
exports.showAllMessages = showAllMessages;
const submitMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, chatId, studentId } = req.body;
        if (!content || !chatId) {
            return res.status(400).json({ error: 'Invalid' });
        }
        let newMessage = {
            sender: studentId,
            chat: chatId,
            content: content
        };
        let message = yield MessageModel_1.default.create(newMessage);
        message = yield message.populate('sender', 'studentName photo');
        message = yield message.populate('chat');
        // message = await studentModel.populate(message , {
        //     path : 'chat.users',
        //     select : 'studentName photo'
        // });
        yield chatModel_1.default.findByIdAndUpdate(chatId, {
            lastMessage: message
        }, { new: true });
        console.log(message);
        return res.status(200).json({ msg: 'Messsage sent', message });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'There was an error processing your request' });
    }
});
exports.submitMessage = submitMessage;
