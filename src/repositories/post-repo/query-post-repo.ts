import {OutputItemPostType, OutputPostType, PostType} from "../../types/post/output";
import {postCollection} from "../../db";
import {postMapper} from "../../types/post/mapper";
import {ObjectId, WithId} from "mongodb";
import {SortPostType} from "../../types/post/input";

export class QueryPostRepo {
    static async getAllPosts(sortData: SortPostType): Promise<OutputPostType> {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {}

        const posts = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === 'desc' ? -1: 1})
            .skip((pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        const pageCount = Math.ceil(totalCount / +pageSize);

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: posts.map(postMapper)
        }
    }

    static async getPostById(id: string): Promise<OutputItemPostType | null> {
        const post: WithId<PostType> | null = await postCollection.findOne({_id: new ObjectId(id)})

        if (!post) {
            return null
        }
        return postMapper(post)
    }

    static async getPostsByBlogId(blogId: string, sortData:SortPostType ) {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        const posts = await postCollection
            .find({blogId: blogId})
            .sort({[sortBy]: sortDirection === 'desc' ? -1: 1})
            .skip((pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments({blogId: blogId});

        const pageCount = Math.ceil(totalCount / +pageSize);

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: posts.map(postMapper)
        }
    }
}