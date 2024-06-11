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
exports.QueryPostRepo = void 0;
const mapper_1 = require("../../types/post/mapper");
const mongodb_1 = require("mongodb");
const post_1 = require("../../models/post");
class QueryPostRepo {
    // static async getAllPosts(sortData: SortPostType): Promise<OutputPostType> {
    //
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const pageSize = sortData.pageSize ?? 10
    //     const pageNumber = sortData.pageNumber ?? 1
    //
    //     let filter = {}
    //
    //     const posts = await postCollection
    //         .find(filter)
    //         .sort({[sortBy]: sortDirection === 'desc' ? -1: 1})
    //         .skip((pageNumber - 1) * +pageSize)
    //         .limit(+pageSize)
    //         .toArray();
    //
    //     const totalCount = await postCollection.countDocuments(filter);
    //
    //     const pageCount = Math.ceil(totalCount / +pageSize);
    //
    //     return {
    //         pagesCount: pageCount,
    //         page: +pageNumber,
    //         pageSize: +pageSize,
    //         totalCount: totalCount,
    //         items: posts.map(postMapper)
    //     }
    // }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_1.PostModel.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return null;
            }
            return (0, mapper_1.postMapper)(post);
        });
    }
}
exports.QueryPostRepo = QueryPostRepo;
//# sourceMappingURL=query-post-repo.js.map