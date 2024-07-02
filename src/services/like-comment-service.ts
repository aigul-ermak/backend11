import {LikeCommentRepo} from "../repositories/like-repo/like-comment-repo";


export class LikeCommentService {
    constructor(protected likeCommentRepo: LikeCommentRepo) {

    }

    async makeStatus(userId: string, likeStatus: string, parentId: string) {

        const like = {status: likeStatus, userId, parentId};
        return await this.likeCommentRepo.makeStatus(like);
    }
}