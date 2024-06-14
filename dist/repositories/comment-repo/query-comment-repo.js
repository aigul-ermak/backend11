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
exports.QueryCommentRepo = void 0;
const mongodb_1 = require("mongodb");
const mapper_1 = require("../../types/comment/mapper");
const comment_1 = require("../../models/comment");
class QueryCommentRepo {
    static getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO type
            const comment = yield comment_1.CommentModel.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!comment) {
                return null;
            }
            return (0, mapper_1.commentMapper)(comment);
        });
    }
    static getCommentByPostId(postId, sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const sortDirection = (_a = sortData.sortDirection) !== null && _a !== void 0 ? _a : 'desc';
            const sortBy = (_b = sortData.sortBy) !== null && _b !== void 0 ? _b : 'createdAt';
            const pageSize = (_c = sortData.pageSize) !== null && _c !== void 0 ? _c : 10;
            const pageNumber = (_d = sortData.pageNumber) !== null && _d !== void 0 ? _d : 1;
            let filter = { postId: postId };
            // const comment: WithId<CommentType>[] = await commentCollection
            //     .find(filter)
            //     .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1})
            //     .skip((pageNumber - 1) * +pageSize)
            //     .limit(+pageSize)
            //     .toArray();
            //
            // const totalCount: number = await commentCollection.countDocuments(filter);
            //
            // const pageCount: number = Math.ceil(totalCount / +pageSize);
            // return {
            //     pagesCount: pageCount,
            //     page: +pageNumber,
            //     pageSize: +pageSize,
            //     totalCount: totalCount,
            //     items: comment.map(commentMapper)
            // }
        });
    }
}
exports.QueryCommentRepo = QueryCommentRepo;
//# sourceMappingURL=query-comment-repo.js.map