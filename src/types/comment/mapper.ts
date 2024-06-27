import {WithId} from "mongodb";
import {CommentDBType, OutputItemCommentType} from "./output";

//TODO type??
export const commentMapper = (comment: WithId<CommentDBType>): any => {
    //let CommentatorInfo;
    return {
        commentId: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
    }
}