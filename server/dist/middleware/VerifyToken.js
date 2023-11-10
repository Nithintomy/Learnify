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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in your environment variables');
}
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        console.log('Token received:', token);
        console.log(token, "hey token");
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        console.log('Token is valid:', decodedToken);
        req.decodedToken = decodedToken;
        next();
    }
    catch (error) {
        console.error('Token verification failed', error.message);
        return res.status(401).json({ message: 'Token verification failed' });
    }
    ;
});
exports.default = verifyToken;
