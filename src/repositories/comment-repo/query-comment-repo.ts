import {commentCollection} from "../../db";
import {ObjectId, WithId} from "mongodb";
import {commentMapper} from "../../types/comment/mapper";
import {CommentType, OutputItemCommentType, SortCommentType} from "../../types/comment/output";


export class QueryCommentRepo {
    static async getCommentById(id: string): Promise<OutputItemCommentType | null> {

        const comment: WithId<CommentType> | null = await commentCollection.findOne({_id: new ObjectId(id)})

        if (!comment) {
            return null
        }
        return commentMapper(comment)
    }

    static async getCommentByPostId(postId: string, sortData: SortCommentType) {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {postId: postId}

        const comment: WithId<CommentType>[] = await commentCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === 'desc' ? -1 : 1})
            .skip((pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray();

        const totalCount: number = await commentCollection.countDocuments(filter);

        const pageCount: number = Math.ceil(totalCount / +pageSize);

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: comment.map(commentMapper)
        }
    }
}