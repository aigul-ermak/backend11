import {SortDataType} from "../../types/blog/input";
import {blogCollection} from "../../db";
import {blogMapper} from "../../types/blog/mapper";
import {BlogType, OutputBlogType, OutputItemBlogType} from "../../types/blog/output";
import {ObjectId, WithId} from "mongodb";

export class QueryBlogRepo {
    static async getAllBlogs(sortData: SortDataType) : Promise<OutputBlogType> {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const searchNameTerm = sortData.searchNameTerm ?? null
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {}

        if(searchNameTerm) {
            filter = {
                name: {
                    $regex: searchNameTerm,
                    $options: 'i'
                }
            }
        }

        const blogs: WithId<BlogType>[] = await blogCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === 'desc' ? -1: 1})
            .skip((pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray();

        const totalCount: number = await blogCollection.countDocuments(filter);

        const pageCount: number = Math.ceil(totalCount / +pageSize);

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: blogs.map(blogMapper)
        }
    }

    static async getBlogById(id: string): Promise<OutputItemBlogType | null> {

        const blog: WithId<BlogType> | null = await blogCollection.findOne({_id: new ObjectId(id)})

        if (!blog) {
            return null
        }
        return blogMapper(blog)
    }
}