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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepo = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
class CommentRepo {
    static createComment(newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.commentCollection.insertOne(newComment);
            return result.insertedId.toString();
        });
    }
    static updateComment(id, contentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.commentCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    content: contentData.content
                }
            });
            return !!res.matchedCount;
        });
    }
    static deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.commentCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!result.deletedCount;
        });
    }
}
exports.CommentRepo = CommentRepo;
//# sourceMappingURL=comment-repo.js.map