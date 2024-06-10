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
exports.postRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
const post_service_1 = require("../services/post-service");
const post_repo_1 = require("../repositories/post-repo/post-repo");
const blog_validator_1 = require("../validators/blog-validator");
// import {postExistsMiddleware} from "../middleware/comment/post-middleware";
// import {authBearerMiddleware} from "../middleware/auth/auth-bearer-middleware";
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    // const posts: OutputPostType = await QueryPostRepo.getAllPosts(sortData)
    // res.status(200).send(posts)
}));
// postRouter.get('/:id', mongoIdInParamValidation(),
//     async (req: RequestWithParams<Params>, res: Response<PostType>) => {
//         const id: string = req.params.id
//
//         const post: PostType | null = await QueryPostRepo.getPostById(id)
//
//         if (post) {
//             res.status(200).send(post)
//         } else {
//             res.sendStatus(404)
//             return
//         }
//     })
/**
 * hw 6 returns comments for specified post
 */
// // // postRouter.get('/:id/comments', mongoIdInParamValidation(),
// // //     async (req: RequestTypeWithQueryAndParams<{ id: string }, SortCommentType>, res: Response<OutputCommentType>) => {
// // //
// // //         const postId: string = req.params.id
// // //
// // //         const sortData: SortCommentType = {
// // //             sortBy: req.query.sortBy,
// // //             sortDirection: req.query.sortDirection,
// // //             pageNumber: req.query.pageNumber,
// // //             pageSize: req.query.pageSize
// // //         }
// // //
// // //         const post: PostType | null = await QueryPostRepo.getPostById(postId)
// // //
// // //         if (!post) {
// // //             res.sendStatus(404)
// // //             return
// // //         }
// // //
// // //         const comments: OutputCommentType = await QueryCommentRepo
// // //             .getCommentByPostId(postId, sortData)
// // //
// // //         if (comments.items.length > 0) {
// // //             res.status(200).send(comments)
// // //         } else {
// // //             res.sendStatus(404)
// // //             return
// // //         }
// // //     })
// //
// // postRouter.post('/',
// //     authMiddleware,
// //     postValidation(),
// //     async (req: RequestWithBody<PostType>, res: Response) => {
// //
// //         const newData: PostType = req.body;
// //         const postId: string | null = await PostService.createPost(newData);
// //
// //         if (!postId) {
// //             res.sendStatus(404);
// //             return;
// //         }
// //
// //         const newPost: PostType | null = await QueryPostRepo.getPostById(postId);
// //         if (newPost) {
// //             res.status(201).send(newPost);
// //         } else {
// //             res.sendStatus(404);
// //             return
// //         }
// //     });
//
// /**
//  * hw 6 create new comment
//  */
// postRouter.post('/:id/comments', authBearerMiddleware,
//     mongoIdInParamValidation(), postExistsMiddleware, commentValidation(),
//     async (req: Request, res: Response) => {
//
//         const postId: string = req.params.id;
//         const contentData = req.body;
//         //TODO any type for user
//         const user: any  = req.user
// const commentId: string = await CommentService.createComment(contentData, user, postId);
//
// if (!commentId) {
//     res.sendStatus(404);
//     return;
// }
//
// const newComment: OutputItemCommentType| null = await QueryCommentRepo.getCommentById(commentId);
//
// if (newComment) {
//     res.status(201).send(newComment);
// } else {
//     res.sendStatus(400);
//     return
// }
// })
exports.postRouter.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const isUpdated = yield post_service_1.PostService.updatePost(id, updateData);
    if (isUpdated) {
        res.sendStatus(204);
        return;
    }
    res.sendStatus(404);
}));
exports.postRouter.delete('/:id', auth_middleware_1.authMiddleware, (0, blog_validator_1.mongoIdInParamValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isPostDeleted = yield post_repo_1.PostRepo.deletePost(id);
    if (!isPostDeleted) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
//# sourceMappingURL=post-router.js.map