import mongoose, {Schema, model, Document} from 'mongoose';
import {LikeDBModel} from "../types/like/output";


enum LIKE_STATUS {
    LIKE = 'like',
    DISLIKE = 'dislike',
    NONE = 'none'
}

// const likesSchema = new mongoose.Schema({
//     createdAt: {type: Date, required: true},
//     status: {type: LikeStatus, required: true},
//     userId: {type: String, required: true},
// });


const likesSchema = new mongoose.Schema<LikeDBModel>({
    id: {type: String, required: true},
    status: {type: String, enum: Object.values(LIKE_STATUS), required: true},
    userId: {type: String, required: true},
    parentId: {type: String, required: true},
});

export const LikePostModel = mongoose.model('LikePostModel', likesSchema);
export const LikeCommentModel = mongoose.model('LikeCommentModel', likesSchema);