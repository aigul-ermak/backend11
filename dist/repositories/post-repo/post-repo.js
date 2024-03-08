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
exports.PostRepo = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
const query_blog_repo_1 = require("../blog-repo/query-blog-repo");
class PostRepo {
    static createPostToBlog(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postCollection.insertOne(newData);
            return res.insertedId.toString();
        });
    }
    static createPost(newData, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const newPost = Object.assign(Object.assign({}, newData), { blogName: blog.name, createdAt: createdAt.toISOString() });
            const res = yield db_1.postCollection.insertOne(newPost);
            return res.insertedId.toString();
        });
    }
    static updatePost(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(updateData.blogId);
            const res = yield db_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: updateData.title,
                    shortDescription: updateData.shortDescription,
                    content: updateData.content,
                    blogId: updateData.blogId,
                    blogName: blog === null || blog === void 0 ? void 0 : blog.name
                }
            });
            return !!res.matchedCount;
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=post-repo.js.map