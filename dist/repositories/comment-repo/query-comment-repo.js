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
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
const mapper_1 = require("../../types/comment/mapper");
class QueryCommentRepo {
    static getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.commentCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!comment) {
                return null;
            }
            return (0, mapper_1.commentMapper)(comment);
        });
    }
    static getCommentByPostId(postId, sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortDirection = (_a = sortData.sortDirection) !== null && _a !== void 0 ? _a : 'desc';
            const sortBy = (_b = sortData.sortBy) !== null && _b !== void 0 ? _b : 'createdAt';
            const pageSize = (_c = sortData.pageSize) !== null && _c !== void 0 ? _c : 10;
            const pageNumber = (_d = sortData.pageNumber) !== null && _d !== void 0 ? _d : 1;
            let filter = { postId: postId };
            const comment = yield db_1.commentCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip((pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray();
            const totalCount = yield db_1.commentCollection.countDocuments(filter);
            const pageCount = Math.ceil(totalCount / +pageSize);
            return {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: totalCount,
                items: comment.map(mapper_1.commentMapper)
            };
        });
    }
}
exports.QueryCommentRepo = QueryCommentRepo;
//# sourceMappingURL=query-comment-repo.js.map