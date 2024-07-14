import {CommentModel} from "../../models/comment";
import {LikeCommentModel} from "../../models/like";
import {ObjectId} from "mongodb";
import {commentMapper} from "../../types/comment/mapper";
import {BlogModel} from "../../models/blog";
import {LIKE_STATUS, LikeDBModel, LikeType} from "../../types/like/output";


export class LikeCommentRepo {

    async createLike(data: LikeType) {

        if (!data.status) {
            throw new Error('Status is required to create a like');
        }
        if (!Object.values(LIKE_STATUS).includes(data.status)) {
            throw new Error(`Not valid like status: ${data.status}`);
        }
        const res = await LikeCommentModel.create(data);
        return res._id.toString();
    }

    async updateLike(id: string, updateData: any) {
        if (!updateData.status || !Object.values(LIKE_STATUS).includes(updateData.status)) {
            throw new Error('Not valid like status');
        }
        const res = await LikeCommentModel.updateOne({_id: new ObjectId(id)}, {
            $set: {
                status: updateData.status,
                userId: updateData.userId,
                parentId: updateData.parentId,
            }
        })
        return !!res.matchedCount;

    }

    async getLike(parentId: string, userId: string) {
        const res = await LikeCommentModel.findOne({parentId: parentId, userId: userId});
        return res;
    }

    async checkLike(parentId: string, userId: string) {
        const res = await LikeCommentModel.findOne({parentId: parentId, userId: userId}).lean();
        return !!res;
    }

//     async removeLike(parentId: string, userId: string) {
// const res = await LikeCommentModel.findOne({_id: parentId, userId: userId});
//
// if(!res) {
//     return false;
// }
//
//     }

    async makeStatus(like: any) {
        const res = await LikeCommentModel.create(like)
        return res._id.toString();
    }

    async findLikeByCommentId(id: string) {
        const like = await LikeCommentModel.findOne({_id: new ObjectId(id)})

        if (!like) {
            return null
        }
        return ({})
    }
}