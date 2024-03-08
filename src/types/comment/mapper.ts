import {WithId} from "mongodb";
import {CommentType, OutputItemCommentType} from "./output";

export const commentMapper = (comment: WithId<CommentType>): OutputItemCommentType => {
    let CommentatorInfo;
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
    }
}