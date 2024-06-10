import {Router, Request, Response} from "express";
import {OutputPostType, PostType} from "../types/post/output";
import {authMiddleware} from "../middleware/auth/auth-middleware";
import {RequestBodyAndParams, RequestTypeWithQueryAndParams, RequestWithBody, RequestWithParams} from "../types/common";
import {Params} from "./videos-router";
import {postValidation} from "../validators/post-validator";
import {QueryPostRepo} from "../repositories/post-repo/query-post-repo";
import {PostService} from "../services/post-service";
import {PostRepo} from "../repositories/post-repo/post-repo";
import {SortPostType} from "../types/post/input";
import {mongoIdInParamValidation} from "../validators/blog-validator";
import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {CommentService} from "../services/comment-service";
import {commentValidation} from "../validators/comment-validator";
import { OutputCommentType, OutputItemCommentType, SortCommentType} from "../types/comment/output";
// import {postExistsMiddleware} from "../middleware/comment/post-middleware";
// import {authBearerMiddleware} from "../middleware/auth/auth-bearer-middleware";

export const postRouter = Router({})

//TODO - replace type
type RequestTypeWithQuery<Q> = Request<{}, {}, {}, Q>;

postRouter.get('/', async (req: RequestTypeWithQuery<SortPostType>, res: Response) => {

    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    // const posts: OutputPostType = await QueryPostRepo.getAllPosts(sortData)
    // res.status(200).send(posts)

})

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

postRouter.put('/:id',
    authMiddleware,
    postValidation(),
    async (req: RequestBodyAndParams<Params, PostType>, res: Response) => {
        const id: string = req.params.id;
        const updateData: PostType = req.body;
        const isUpdated: boolean = await PostService.updatePost(id, updateData);

        if (isUpdated) {
            res.sendStatus(204);
            return
        }
        res.sendStatus(404);
    });

postRouter.delete('/:id',
    authMiddleware,
    mongoIdInParamValidation(),
    async (req: RequestWithParams<Params>, res: Response) => {
        const id: string = req.params.id;
        const isPostDeleted: boolean = await PostRepo.deletePost(id);

        if (!isPostDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    })