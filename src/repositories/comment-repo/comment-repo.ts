import {DeleteResult, InsertOneResult, ObjectId, UpdateResult} from "mongodb";
import {CommentDBType, OutputItemCommentType} from "../../types/comment/output";
import {CommentModel} from "../../models/comment";


export class CommentRepo {

    static async createComment( newComment: any ) {
        //TODO type??
        const res : any = await CommentModel.create(newComment)
        return res._id.toString();
    }

    static async updateComment(id: string, contentData: CommentDBType) : Promise<boolean> {
        const res: UpdateResult<CommentDBType> = await CommentModel.updateOne({_id: new ObjectId(id)},
            {
                $set: {
                    content: contentData.content
                }
            }
        )
        return !!res.matchedCount
    }

    static async deleteComment(id: string): Promise<boolean> {
        const result: DeleteResult = await CommentModel.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount;
    }
}