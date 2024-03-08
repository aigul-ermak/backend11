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
exports.PostRepository = void 0;
const db_1 = require("../db");
const mapper_1 = require("../types/post/mapper");
const mongodb_1 = require("mongodb");
const blog_repository_1 = require("./blog-repository");
class PostRepository {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield db_1.postCollection.find({}).toArray();
            return posts.map(mapper_1.postMapper);
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return null;
            }
            return (0, mapper_1.postMapper)(post);
        });
    }
    static createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const blogName = yield blog_repository_1.BlogRepository.getBlogById(data.blogId);
            if (blogName) {
                const newPost = Object.assign(Object.assign({}, data), { blogName: blogName.name, createdAt: createdAt.toISOString() });
                const res = yield db_1.postCollection.insertOne(newPost);
                return res.insertedId.toString();
            }
            else {
                return null;
            }
        });
    }
    static updatePost(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_repository_1.BlogRepository.getBlogById(updateData.blogId);
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
exports.PostRepository = PostRepository;
//# sourceMappingURL=post-repository.js.map