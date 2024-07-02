import mongoose from 'mongoose';

import {CommentDBType} from "../types/comment/output";

// enum LIKE_STATUS {
//     LIKE = 'like',
//     DISLIKE = 'dislike',
//     NONE = 'none'
// }
//
// const likesSchema = new mongoose.Schema<LikeDBModel>({
//     userId: {type: String, required: true},
//     status: {type: String, enum: LIKE_STATUS},
// })

const commentatorInfoSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userLogin: {type: String, required: true}
}, {_id: false});

const commentSchema = new mongoose.Schema<CommentDBType>({
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {type: commentatorInfoSchema, required: true},
    createdAt: Date,
    likesCount: {type: Number,default: 0},
    dislikesCount:  {type: Number, default: 0},
});

export const CommentModel = mongoose.model('Comment', commentSchema);
