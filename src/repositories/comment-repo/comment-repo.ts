import {commentCollection} from "../../db";
import {DeleteResult, InsertOneResult, ObjectId, UpdateResult} from "mongodb";
import {CommentType, OutputItemCommentType} from "../../types/comment/output";


export class CommentRepo {

    static async createComment( newComment: OutputItemCommentType) {
        const result : InsertOneResult<CommentType> = await commentCollection.insertOne(newComment)
        return result.insertedId.toString();
    }

    static async updateComment(id: string, contentData: CommentType) : Promise<boolean> {
        const res: UpdateResult<CommentType> = await commentCollection.updateOne({_id: new ObjectId(id)},
            {
                $set: {
                    content: contentData.content
                }
            }
        )
        return !!res.matchedCount
    }

    static async deleteComment(id: string): Promise<boolean> {
        const result: DeleteResult = await commentCollection.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount;
    }
}