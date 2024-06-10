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
exports.blogRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth/auth-middleware");
const blog_validator_1 = require("../validators/blog-validator");
const blog_service_1 = require("../services/blog-service");
const query_blog_repo_1 = require("../repositories/blog-repo/query-blog-repo");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const blogs = yield query_blog_repo_1.QueryBlogRepo.getAllBlogs(sortData);
    res.status(200).send(blogs);
}));
exports.blogRouter.get('/:id', (0, blog_validator_1.mongoIdInParamValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(blogId);
    if (!blog) {
        res.sendStatus(404);
    }
    else {
        res.send(blog);
    }
}));
// blogRouter.get('/:id/posts',
//     mongoIdInParamValidation(),
//     async (req: RequestTypeWithQueryAndParams<{ id: string }, SortPostType>, res: Response<OutputPostType>) => {
//         const id: string = req.params.id
//
//         const sortData: SortPostType = {
//             sortBy: req.query.sortBy,
//             sortDirection: req.query.sortDirection,
//             pageNumber: req.query.pageNumber,
//             pageSize: req.query.pageSize
//         }
//
//         const blog: null | BlogType = await QueryBlogRepo.getBlogById(id)
//
//         if (!blog) {
//             res.sendStatus(404)
//             return
//         }
//
//         const posts: OutputPostType = await QueryPostRepo.getPostsByBlogId(id, sortData);
//
//         if (!posts) {
//             res.sendStatus(204)
//             return
//         }
//         res.status(200).send(posts)
//     })
exports.blogRouter.post('/', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    const blog = yield blog_service_1.BlogService.createBlog(newData);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(blog);
}));
// blogRouter.post('/:id/posts',
// authMiddleware,
// blogPostValidation(),
// async (req: RequestBodyAndParams<{ id: string }, {
//     title: string,
//     shortDescription: string,
//     content: string
// }>, res: Response<OutputItemPostType>) => {
//
//     const id: string = req.params.id
//
//     const {title, shortDescription , content} = req.body;
//
//     const post : OutputItemPostType | null  = await BlogService.createPostToBlog(id, {title, shortDescription, content})
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//     res.status(201).send(post)
// });
// blogRouter.put('/:id',
//     authMiddleware,
//     blogValidation(),
// async (req: RequestBodyAndParams<Params, UpdateBlogData>, res: Response) => {
//     const updateData = req.body;
//     const id = req.params.id;
//
//     let isBlogUpdated = await BlogService.updateBlog(id, updateData);
//
//     if (isBlogUpdated) {
//         res.sendStatus(204);
//         return
//     }
//  res.sendStatus(404);
// });
exports.blogRouter.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id;
    //
    // const result = await BlogService.deleteBlog(id);
    //
    // if (!result) {
    //     res.sendStatus(404);
    //     return
    // }
    //  res.sendStatus(204);
}));
//# sourceMappingURL=blog-router.js.map