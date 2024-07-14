import {LikeCommentRepo} from "../repositories/like-repo/like-comment-repo";
import {LIKE_STATUS} from "../types/like/output";
import {CommentRepo} from "../repositories/comment-repo/comment-repo";


export class LikeCommentService {
    constructor(protected likeCommentRepo: LikeCommentRepo, protected commentRepo: CommentRepo) {
    }

    async makeStatus(userId: string, likeStatus: LIKE_STATUS, parentId: string) {
        // check is status == Like or Dislike
        const isLikeExist = await this.likeCommentRepo.checkLike(parentId, userId);
        let like;

        if (!isLikeExist) {
            if (!likeStatus) {
                throw new Error('Like status is required');
            }
            like = {status: likeStatus, userId, parentId};
            const res = await this.likeCommentRepo.createLike(like);
            return res;
        } else {
            like = await this.likeCommentRepo.getLike(parentId, userId);
            if (!like) {
                throw new Error('Like not found after checkLike indicated existence');
            }

            if (like.status !== likeStatus) {
                if (like.status === LIKE_STATUS.LIKE) {
                    await this.commentRepo.decrementLikeCount(parentId);
                } else if (like.status === LIKE_STATUS.DISLIKE) {
                    await this.commentRepo.decrementDislikeCount(parentId);
                }

                if (likeStatus === LIKE_STATUS.LIKE) {
                    await this.commentRepo.incrementLikeCount(parentId);
                } else if (likeStatus === LIKE_STATUS.DISLIKE) {
                    await this.commentRepo.incrementDislikeCount(parentId);
                }
            }
            like.status = likeStatus;


            return await this.likeCommentRepo.updateLike(like._id.toString(), like);
        }
        //return await this.likeCommentRepo.makeStatus(like);
    }
}