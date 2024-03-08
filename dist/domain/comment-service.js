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
exports.CommentService = void 0;
const query_comment_repo_1 = require("../repositories/comment-repo/query-comment-repo");
const comment_repo_1 = require("../repositories/comment-repo/comment-repo");
class CommentService {
    static updateComment(commentId, contentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield query_comment_repo_1.QueryCommentRepo.getCommentById(commentId);
            if (!comment) {
                return false;
            }
            return yield comment_repo_1.CommentRepo.updateComment(commentId, contentData);
        });
    }
    static createComment(contentData, user, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = {
                id: postId,
                content: contentData.content,
                commentatorInfo: {
                    userId: user.id,
                    userLogin: user.accountData.login
                },
                createdAt: new Date().toISOString()
            };
            const commentId = yield comment_repo_1.CommentRepo.createComment(newComment);
            return commentId;
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment-service.js.map