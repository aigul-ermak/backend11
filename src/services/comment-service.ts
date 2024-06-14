import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {OutputUserItemType} from "../types/user/output";
import {CommentDBType, OutputItemCommentType} from "../types/comment/output";
import {CommentRepo} from "../repositories/comment-repo/comment-repo";

export class CommentService {
    static async updateComment(commentId: string, contentData: CommentDBType) {

        const comment: OutputItemCommentType | null = await QueryCommentRepo.getCommentById(commentId)

        if (!comment) {
            return false
        }
         return await CommentRepo.updateComment(commentId, contentData)
    }

    static async createComment(contentData: CommentDBType, user: OutputUserItemType, postId: string) {

        const newComment = {
            postId: postId,
            content: contentData.content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.accountData.login
            },
            createdAt: new Date().toISOString()
        }

        const commentId: string = await CommentRepo.createComment(newComment)
        return commentId
    }


}