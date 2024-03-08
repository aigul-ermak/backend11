"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middleware/auth/auth-middleware");
const blog_validator_1 = require("../validators/blog-validator");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => {
    const blogs = blog_repository_1.BlogRepository.getAllBlogs();
    res.send(blogs);
});
exports.blogRoute.get('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const blog = blog_repository_1.BlogRepository.getBlogById(id);
    console.log("blog route.ts");
    if (!blog) {
        res.send(404);
    }
    res.send(blog);
});
exports.blogRoute.post('/:id', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogPostValidation)(), (req, res) => {
    const id = req.params.id;
    const blog = blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.send(404);
    }
    res.send(blog);
});
