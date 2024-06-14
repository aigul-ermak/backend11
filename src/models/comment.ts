import mongoose, {Schema, model, Document} from 'mongoose';
import {BlogDBType} from "../types/blog/output";
import {CommentDBType} from "../types/comment/output";

const commentatorInfoSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userLogin: {type: String, required: true}
}, {_id: false});

const commentSchema = new mongoose.Schema<CommentDBType>({
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {type: commentatorInfoSchema, required: true},
    createdAt: Date
});

export const CommentModel = mongoose.model('Comment', commentSchema);
