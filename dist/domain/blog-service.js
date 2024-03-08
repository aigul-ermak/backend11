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
exports.BlogService = void 0;
const blog_repo_1 = require("../repositories/blog-repo/blog-repo");
const query_blog_repo_1 = require("../repositories/blog-repo/query-blog-repo");
const query_post_repo_1 = require("../repositories/post-repo/query-post-repo");
const post_repo_1 = require("../repositories/post-repo/post-repo");
class BlogService {
    static createBlog(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, newData), { createdAt: new Date().toISOString(), isMembership: false });
            const blogId = yield blog_repo_1.BlogRepo.createBlog(newBlog);
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(blogId);
            if (!blog) {
                return null;
            }
            return blog;
        });
    }
    static createPostToBlog(blogId, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(blogId);
            if (!blog) {
                return null;
            }
            const newPost = Object.assign(Object.assign({}, postData), { blogId: blogId, blogName: blog.name, createdAt: new Date().toISOString() });
            const postId = yield post_repo_1.PostRepo.createPostToBlog(newPost);
            if (!postId) {
                return null;
            }
            const post = yield query_post_repo_1.QueryPostRepo.getPostById(postId);
            return post;
        });
    }
    static updateBlog(blogId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(blogId);
            if (!blog) {
                return false;
            }
            return yield blog_repo_1.BlogRepo.updateBlog(blogId, updateData);
        });
    }
    static deleteBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogExists = yield query_blog_repo_1.QueryBlogRepo.getBlogById(blogId);
            if (!blogExists) {
                return null;
            }
            yield blog_repo_1.BlogRepo.deleteBlog(blogId);
            return true;
        });
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog-service.js.map