import {CreatePostData, UpdatePostData} from "../../types/post/input";
import {PostType} from "../../types/post/output";
import {postCollection} from "../../db";
import {ObjectId} from "mongodb";
import {BlogType} from "../../types/blog/output";
import {QueryBlogRepo} from "../blog-repo/query-blog-repo";

export class PostRepo {
       static async createPostToBlog(newData: any) {

        const res = await postCollection.insertOne(newData);
        return res.insertedId.toString();

    }

    static async createPost(newData: CreatePostData, blog: BlogType) {

        const createdAt = new Date();

        const newPost: PostType = {
            ...newData,
            blogName: blog.name,
            createdAt: createdAt.toISOString()
        }

        const res = await postCollection.insertOne(newPost);
        return res.insertedId.toString();

    }

    static async updatePost(id: string, updateData: UpdatePostData): Promise<boolean> {
        const blog = await QueryBlogRepo.getBlogById(updateData.blogId)

        const res = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: updateData.title,
                shortDescription: updateData.shortDescription,
                content: updateData.content,
                blogId: updateData.blogId,
                blogName: blog?.name
            }
        })
        return !!res.matchedCount;
    }

    static async deletePost(id: string): Promise<boolean> {
        const res = await postCollection.deleteOne({_id: new ObjectId(id)});

        return !!res.deletedCount;
    }
}