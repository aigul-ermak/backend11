
import {CommentService} from "../services/comment-service";
import {Request, Response} from "express";
import {OutputUserItemType} from "../types/user/output";
import {OutputItemCommentType} from "../types/comment/output";
import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {RequestWithParams} from "../types/common";
import {Params} from "../routes/videos-router";

export class CommentController {
    constructor(protected commentService: CommentService) {
    }

    async getCommentById(req: RequestWithParams<Params>, res: Response<OutputItemCommentType>) {
        const id: string = req.params.id;

        const comment: OutputItemCommentType | null = await QueryCommentRepo.getCommentById(id)

        if (comment) {
            res.status(200).send(comment)
        } else {
            res.sendStatus(404)
            return
        }
    }

    async updateComment(req: Request, res: Response) {

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

        let isCommentUpdated = await this.commentService.updateComment(id, contentData)

        if (!isCommentUpdated) {
            res.sendStatus(404);
            return
        }

        res.sendStatus(204);
    }

    async deleteComment(req: Request, res: Response) {
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

        const result: boolean = await this.commentService.deleteComment(id);

        if (!result) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

}