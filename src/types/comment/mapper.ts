import {WithId} from "mongodb";
import {CommentDBType, OutputItemCommentType} from "./output";

export const commentMapper = (comment: WithId<CommentDBType>): OutputItemCommentType => {
    //let CommentatorInfo;
    return {
        //id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt,
    }
}