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
exports.runDb = exports.requestCollection = exports.sessionCollection = exports.commentCollection = exports.userCollection = exports.postCollection = exports.blogCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGO_URL;
console.log('url: ', url);
if (!url) {
    throw new Error('! Url doesn\'t found');
}
exports.client = new mongodb_1.MongoClient(url);
const db = exports.client.db();
exports.blogCollection = db.collection('blogs');
exports.postCollection = db.collection('post');
exports.userCollection = db.collection('user');
exports.commentCollection = db.collection('comment');
//export const usedTokenCollection = config.collection<TokenType>('token');
exports.sessionCollection = db.collection('session');
exports.requestCollection = db.collection("apirequest");
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.db("admin").command({ ping: 1 });
        console.log('Connected successfully to server');
    }
    catch (e) {
        console.log('! Don\'t connected successfully to server');
        console.log(e);
        yield exports.client.close();
    }
});
exports.runDb = runDb;
//# sourceMappingURL=config.js.map