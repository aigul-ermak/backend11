import {CreatePostData, UpdatePostData} from "../../types/post/input";
import {PostType} from "../../types/post/output";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../types/blog/output";
import {QueryBlogRepo} from "../blog-repo/query-blog-repo";
import {PostModel} from "../../models/post";
import {PostService} from "../../services/post-service";

export class PostRepo {
    static async createPostToBlog(newData: any) {

        // const res = await postCollection.insertOne(newData);
        // return res.insertedId.toString();

    }

    static async createPost(newData: CreatePostData, blog: BlogDBType): Promise<string> {
        const newPost: PostType = {
            ...newData,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }

        const post = new PostModel(newPost);

        const res = await post.save();
        return res._id.toString();

    }

    static async updatePost(id: string, updateData: UpdatePostData): Promise<boolean> {
        const blog = await QueryBlogRepo.getBlogById(updateData.blogId)

        const res = await PostModel.updateOne({_id: new ObjectId(id)}, {
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
        const res = await PostModel.deleteOne({_id: new ObjectId(id)});

        return !!res.deletedCount;
    }
}