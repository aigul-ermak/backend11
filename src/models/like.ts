// import mongoose, {Schema, model, Document} from 'mongoose';
// import {CommentDBType} from "../types/comment/output";
//
//
// const likesSchema = new mongoose.Schema({
//     createdAt: {type: Date, required: true},
//     status: {type: LikeStatus, required: true},
//     authorId: {type: String, required: true},
// });
//
//
// const commentSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     likes: {type: [likesSchema]},
//     likesCount: {type: Number, required: true},
//     dislikesCount: {type: Number, required: true},
// });
//
// export const CommentModel = mongoose.model('Like', commentSchema);