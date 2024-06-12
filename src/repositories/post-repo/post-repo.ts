import {CreatePostData, UpdatePostData} from "../../types/post/input";
import {PostDBType} from "../../types/post/output";
import {ObjectId} from "mongodb";
import {BlogDBType} from "../../types/blog/output";
import {QueryBlogRepo} from "../blog-repo/query-blog-repo";
import {PostModel} from "../../models/post";
import {PostService} from "../../services/post-service";
import {BlogModel} from "../../models/blog";

export class PostRepo {
    //TODO any here
    static async createPostToBlog(newData: any) {

        const res = await PostModel.create(newData);
        return res._id.toString();
        //TODO delete
        //return res.insertedId.toString();
    }

    static async createPost(data: CreatePostData): Promise<string | null> {
        try {
            const res = await PostModel.create(data);
            return res._id.toString();
        } catch(e) {
            console.log(e);
            return null;
        }

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