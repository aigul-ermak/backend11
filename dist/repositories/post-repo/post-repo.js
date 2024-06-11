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
const mongodb_1 = require("mongodb");
const query_blog_repo_1 = require("../blog-repo/query-blog-repo");
const post_1 = require("../../models/post");
class PostRepo {
    static createPostToBlog(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            // const res = await postCollection.insertOne(newData);
            // return res.insertedId.toString();
        });
    }
    static createPost(data, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield post_1.PostModel.create(data);
                return res._id.toString();
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static updatePost(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(updateData.blogId);
            const res = yield post_1.PostModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
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
            const res = yield post_1.PostModel.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=post-repo.js.map