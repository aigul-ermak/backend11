import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {OutputUserItemType} from "../types/user/output";
import {CommentDBType, OutputItemCommentType} from "../types/comment/output";
import {CommentRepo} from "../repositories/comment-repo/comment-repo";
import {UserRepo} from "../repositories/user-repo/user-repo";

export class CommentService {

    constructor(protected commentRepo: CommentRepo) {
    }

    async updateComment(commentId: string, contentData: CommentDBType) {

        const comment: OutputItemCommentType | null = await QueryCommentRepo.getCommentById(commentId)

        if (!comment) {
            return false
        }
        return await this.commentRepo.updateComment(commentId, contentData)
    }

    async createComment(contentData: CommentDBType, user: OutputUserItemType, postId: string) {

        const newComment = {
            postId: postId,
            content: contentData.content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.accountData.login
            },
            createdAt: new Date().toISOString()
        }

        const commentId = this.commentRepo.createComment(newComment)
        return commentId
    }

    async deleteComment(id: string): Promise<boolean> {
        return await this.commentRepo.deleteComment(id);
    }

}