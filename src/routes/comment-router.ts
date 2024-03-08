import {Router, Request, Response} from "express";
import {commentValidation} from "../validators/comment-validator";
import {CommentService} from "../domain/comment-service";
import {CommentRepo} from "../repositories/comment-repo/comment-repo";
import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {mongoIdInParamValidation} from "../validators/blog-validator";
import {authBearerMiddleware} from "../middleware/auth/auth-bearer-middleware";
import {OutputItemCommentType} from "../types/comment/output";
import {RequestWithParams} from "../types/common";
import {Params} from "./videos-router";
import {OutputUserItemType} from "../types/user/output";


export const commentRouter: Router = Router({})

/**
 * hw 6 return comment by id
 */
commentRouter.get('/:id', async (req: RequestWithParams<Params>, res: Response<OutputItemCommentType>) => {
    const id: string = req.params.id;

    const comment: OutputItemCommentType | null = await QueryCommentRepo.getCommentById(id)

    if (comment) {
        res.status(200).send(comment)
    } else {
        res.sendStatus(404)
        return
    }

})
/**
 * hw 6 update existing comment by id with InputModel
 */
commentRouter.put('/:id', authBearerMiddleware, mongoIdInParamValidation(), commentValidation(),
    async (req: Request, res: Response) => {

    const contentData = req.body
    const id: string = req.params.id;
    const user: OutputUserItemType | null = req.user

    const comment: OutputItemCommentType |null = await QueryCommentRepo.getCommentById(id)

    if(!comment) {
        res.sendStatus(404)
        return
    }

    if (user?.id !== comment?.commentatorInfo.userId) {
        res.sendStatus(403);
        return
    }

    let isCommentUpdated = await CommentService.updateComment(id, contentData)

    if (!isCommentUpdated) {
        res.sendStatus(404);
        return
    }

    res.sendStatus(204);
})

/**
 * HW 6 delete comment specified by id
 */
commentRouter.delete('/:id', authBearerMiddleware, mongoIdInParamValidation(),
    async (req: Request, res: Response) => {
    const id: string = req.params.id
    const user: OutputUserItemType| null = req.user

    const comment : OutputItemCommentType | null = await QueryCommentRepo.getCommentById(id)

    if(!comment) {
        res.sendStatus(404)
        return
    }

    if (user?.id !== comment?.commentatorInfo.userId) {
        res.sendStatus(403)
        return
    }

    const result: boolean = await CommentRepo.deleteComment(id)

    if (!result) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})