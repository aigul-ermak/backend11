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
exports.BlogRepository = void 0;
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
const mapper_1 = require("../types/blog/mapper");
class BlogRepository {
    static getAllBlogs(sortData) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
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
            const blogs = yield db_1.blogCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip((pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray();
            const totalCount = yield db_1.blogCollection.countDocuments(filter);
            const pageCount = Math.ceil(totalCount / +pageSize);
            return {
                pageCount: pageCount,
                page: +pageSize,
                pageSize: +pageSize,
                totalCount: totalCount,
                items: blogs.map(mapper_1.blogMapper)
            };
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            const blog = yield db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return null;
            }
            return (0, mapper_1.blogMapper)(blog);
            // } catch (e) {
            //     return null
            // }
        });
    }
    static createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const newBlog = Object.assign(Object.assign({}, data), { createdAt: createdAt.toISOString(), isMembership: false });
            const res = yield db_1.blogCollection.insertOne(newBlog);
            return res.insertedId.toString();
        });
    }
    static updateBlog(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                }
            });
            return !!res.matchedCount;
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.BlogRepository = BlogRepository;
//# sourceMappingURL=blog-repository.js.map