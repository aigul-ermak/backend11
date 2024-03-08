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
exports.PostService = void 0;
const query_blog_repo_1 = require("../repositories/blog-repo/query-blog-repo");
const post_repo_1 = require("../repositories/post-repo/post-repo");
const query_post_repo_1 = require("../repositories/post-repo/query-post-repo");
class PostService {
    static createPost(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(newData.blogId);
            if (!blog) {
                throw new Error('Blog not found');
            }
            const postId = yield post_repo_1.PostRepo.createPost(newData, blog);
            return postId;
        });
    }
    static updatePost(postId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(updateData.blogId);
            if (!blog) {
                return false;
            }
            updateData.blogName = blog.name;
            return yield post_repo_1.PostRepo.updatePost(postId, updateData);
        });
    }
    static deleteBlog(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postExists = yield query_post_repo_1.QueryPostRepo.getPostById(postId);
            if (!postExists) {
                throw new Error('Post not found');
            }
            yield post_repo_1.PostRepo.deletePost(postId);
        });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map