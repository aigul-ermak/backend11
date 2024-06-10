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
exports.QueryBlogRepo = void 0;
const mapper_1 = require("../../types/blog/mapper");
const blog_1 = require("../../models/blog");
class QueryBlogRepo {
    //static async getAllBlogs(sortData: SortDataType) : Promise<OutputBlogType> {
    static getAllBlogs(sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const sortDirection = (_a = sortData.sortDirection) !== null && _a !== void 0 ? _a : 'desc';
            const sortBy = (_b = sortData.sortBy) !== null && _b !== void 0 ? _b : 'createdAt';
            const searchNameTerm = (_c = sortData.searchNameTerm) !== null && _c !== void 0 ? _c : null;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            const pageNumber = (_e = sortData.pageNumber) !== null && _e !== void 0 ? _e : 1;
            let filter = {};
            if (searchNameTerm) {
                filter = {
                    name: {
                        $regex: searchNameTerm,
                        $options: 'i'
                    }
                };
            }
            // const blogs: WithId<BlogType>[] = await blogSchema
            //     .find(filter)
            //     .sort({[sortBy]: sortDirection === 'desc' ? -1: 1})
            //     .skip((pageNumber - 1) * +pageSize)
            //     .limit(+pageSize)
            //     .toArray();
            //
            // const totalCount: number = await blogCollection.countDocuments(filter);
            //
            // const pageCount: number = Math.ceil(totalCount / +pageSize);
            //
            // return {
            //     pagesCount: pageCount,
            //     page: +pageNumber,
            //     pageSize: +pageSize,
            //     totalCount: totalCount,
            //     items: blogs.map(blogMapper)
            // }
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_1.BlogModel.findOne({ id: id });
            if (!blog) {
                return null;
            }
            return (0, mapper_1.blogMapper)(blog);
        });
    }
}
exports.QueryBlogRepo = QueryBlogRepo;
//# sourceMappingURL=query-blog-repo.js.map