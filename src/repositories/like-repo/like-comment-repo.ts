import {CommentModel} from "../../models/comment";
import {LikeCommentModel} from "../../models/like";
import {ObjectId} from "mongodb";
import {commentMapper} from "../../types/comment/mapper";


export class LikeCommentRepo {

    async createLike(newLike: any) {

    }


    async getLike(newLike: any) {

    }

    async makeStatus(like: any) {
        const res  = await LikeCommentModel.create(like)
        return res._id.toString();
    }

    async findLikeByCommentId(id: string) {
        const like = await LikeCommentModel.findOne({_id: new ObjectId(id)})

        if (!like) {
            return null
        }
        return ({

        })
    }
}