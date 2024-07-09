import {LikeCommentRepo} from "../repositories/like-repo/like-comment-repo";
import {LIKE_STATUS} from "../types/like/output";


export class LikeCommentService {
    constructor(protected likeCommentRepo: LikeCommentRepo) {

    }

    async makeStatus(userId: string, likeStatus: LIKE_STATUS, parentId: string) {




        const like = {status: likeStatus, userId, parentId};


        return await this.likeCommentRepo.makeStatus(like);
    }
}