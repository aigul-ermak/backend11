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
exports.commentRouter = void 0;
const express_1 = require("express");
const comment_validator_1 = require("../validators/comment-validator");
const comment_service_1 = require("../services/comment-service");
const comment_repo_1 = require("../repositories/comment-repo/comment-repo");
const query_comment_repo_1 = require("../repositories/comment-repo/query-comment-repo");
const blog_validator_1 = require("../validators/blog-validator");
const auth_bearer_middleware_1 = require("../middleware/auth/auth-bearer-middleware");
exports.commentRouter = (0, express_1.Router)({});
/**
 * hw 6 return comment by id
 */
exports.commentRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const comment = yield query_comment_repo_1.QueryCommentRepo.getCommentById(id);
    if (comment) {
        res.status(200).send(comment);
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
/**
 * hw 6 update existing comment by id with InputModel
 */
exports.commentRouter.put('/:id', auth_bearer_middleware_1.authBearerMiddleware, (0, blog_validator_1.mongoIdInParamValidation)(), (0, comment_validator_1.commentValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentData = req.body;
    const id = req.params.id;
    const user = req.user;
    const comment = yield query_comment_repo_1.QueryCommentRepo.getCommentById(id);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    if ((user === null || user === void 0 ? void 0 : user.id) !== (comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId)) {
        res.sendStatus(403);
        return;
    }
    let isCommentUpdated = yield comment_service_1.CommentService.updateComment(id, contentData);
    if (!isCommentUpdated) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
/**
 * HW 6 delete comment specified by id
 */
exports.commentRouter.delete('/:id', auth_bearer_middleware_1.authBearerMiddleware, (0, blog_validator_1.mongoIdInParamValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const comment = yield query_comment_repo_1.QueryCommentRepo.getCommentById(id);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    if ((user === null || user === void 0 ? void 0 : user.id) !== (comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId)) {
        res.sendStatus(403);
        return;
    }
    const result = yield comment_repo_1.CommentRepo.deleteComment(id);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
//# sourceMappingURL=comment-router.js.map