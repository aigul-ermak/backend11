import {QueryCommentRepo} from "../repositories/comment-repo/query-comment-repo";
import {OutputUserItemType} from "../types/user/output";
import {CommentDBType, OutputItemCommentType, SortCommentType} from "../types/comment/output";
import {CommentRepo} from "../repositories/comment-repo/comment-repo";
import {UserRepo} from "../repositories/user-repo/user-repo";
import {LikeCommentRepo} from "../repositories/like-repo/like-comment-repo";

export class CommentService {

    constructor(protected commentRepo: CommentRepo, protected likeCommentRepo: LikeCommentRepo) {
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
            createdAt: new Date().toISOString(),
            likesCount: 0,
            dislikesCount: 0,
            myStatus: 'None',
        }

        const commentId = await this.commentRepo.createComment(newComment)

        return commentId;
    }

    async getCommentByPostId(id: string, sortData: SortCommentType){
        return await this.commentRepo.getCommentByPostId(id, sortData);
    }

    async getCommentById(id: string){
        return   await this.commentRepo.getCommentById(id);
    }

    async deleteComment(id: string): Promise<boolean> {
        return await this.commentRepo.deleteComment(id);
    }

}