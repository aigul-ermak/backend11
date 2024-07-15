import {DeleteResult, ObjectId, UpdateResult, WithId} from "mongodb";
import {CommentDBType, OutputItemCommentType, SortCommentType} from "../../types/comment/output";
import {CommentModel} from "../../models/comment";
import {commentMapper} from "../../types/comment/mapper";


export class CommentRepo {

    async createComment(newComment: any) {
        //TODO type??
        const res = await CommentModel.create(newComment)
        return res._id.toString();
    }

    async updateComment(id: string, contentData: CommentDBType): Promise<boolean> {
        const res: UpdateResult<CommentDBType> = await CommentModel.updateOne({_id: new ObjectId(id)},
            {
                $set: {
                    content: contentData.content
                }
            }
        )
        return !!res.matchedCount
    }

    async deleteComment(id: string): Promise<boolean> {
        const result: DeleteResult = await CommentModel.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount;
    }

    async getCommentById(id: string): Promise<OutputItemCommentType | null> {
//TODO type
        const comment: any | null = await CommentModel.findOne({_id: new ObjectId(id)})

        if (!comment) {
            return null
        }
        return commentMapper(comment)
    }

    async getCommentByPostId(postId: string, sortData: SortCommentType) {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {postId: postId}

        const comment: WithId<CommentDBType>[] = await CommentModel
            .find(filter)
            .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1})
            .skip((pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .exec();
        //.toArray();

        const totalCount: number = await CommentModel.countDocuments(filter);

        const pageCount: number = Math.ceil(totalCount / +pageSize);

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: comment.map(commentMapper)
        }
    }

    async incrementLikeCount(id: string) {
        await CommentModel.updateOne({_id: new ObjectId(id)}, {
            $inc: {likesCount: 1}
        });
    }


    async decrementLikeCount(id: string) {
        await CommentModel.updateOne({_id: new ObjectId(id)}, {
            $inc: {likesCount: -1}
        });
    }

    async incrementDislikeCount(id: string) {
        await CommentModel.updateOne({_id: new ObjectId(id)}, {
            $inc: {dislikesCount: 1}
        });
    }

    async decrementDislikeCount(id: string) {
        await CommentModel.updateOne({_id: new ObjectId(id)}, {
            $inc: {dislikesCount: -1}
        });
    }
}