import {CommentService} from "../services/comment-service";
import {Request, Response} from "express";
import {OutputUserItemType} from "../types/user/output";
import {OutputItemCommentType} from "../types/comment/output";
import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {RequestWithParams} from "../types/common";
import {Params} from "../routes/videos-router";
import {LikeCommentService} from "../services/like-comment-service";
import {LIKE_STATUS} from "../types/like/output";
import {jwtService} from "../services/jwt-sevice";

export class CommentController {
    constructor(protected commentService: CommentService, protected likeService: LikeCommentService) {
    }

    async getCommentById(req: RequestWithParams<Params>, res: Response<OutputItemCommentType>) {
        const id: string = req.params.id;

        const comment: OutputItemCommentType | null = await this.commentService.getCommentById(id)

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

        const comment: OutputItemCommentType | null = await this.commentService.getCommentById(id)

        if (!comment) {
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

    async makeLike(req: Request, res: Response) {

        const likeStatus: LIKE_STATUS = req.body.likeStatus

        const commentId: string = req.params.id;

        const comment: OutputItemCommentType | null = await this.commentService.getCommentById(commentId);

        if (!comment) {
            res.sendStatus(404);
            return;
        }

        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            //res.status(401).send({error: 'Access token missing'});
            comment.likesInfo.myStatus = 'None';
            res.status(204).send(comment);
            return;
        }

        // if (!req.headers.authorization) {
        //const comment: OutputItemCommentType | null = await this.commentService.getCommentById(commentId);

        //
        //     comment.likesInfo.myStatus = 'None';
        //     res.status(204).send(comment);
        //     return;
        // }


        const userId: any | null = await jwtService.getUserIdByToken(accessToken);
        if (!userId) {
            res.status(401).send({error: 'Invalid access token'});
            return;
        }

        //let isCommentStatusUpdated = await this.commentService.updateComment(id, contentData)
        let isCommentStatusUpdated = await this.likeService.makeStatus(userId, likeStatus, comment.id);

        if (!isCommentStatusUpdated) {
            res.sendStatus(404);
            return;
        }

        res.sendStatus(204);
    }

    async deleteComment(req: Request, res: Response) {
        const id: string = req.params.id
        const user: OutputUserItemType | null = req.user

        const comment: OutputItemCommentType | null = await QueryCommentRepo.getCommentById(id)

        if (!comment) {
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