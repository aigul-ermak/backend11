import {CreateBlogData, UpdateBlogData} from "../../types/blog/input";
import {BlogDBType} from "../../types/blog/output";
import mongoose from "mongoose";
import {BlogModel, blogSchema} from "../../models/blog";
import {ObjectId} from "mongodb";


export class BlogRepo {
    //static async createBlog(data: BlogType): Promise<string | null> {
    static async createBlog(data: BlogDBType){
        try {
            const res = await BlogModel.create(data);
            return res._id.toString();
        } catch(e) {
            console.log(e);
            return null;
        }

    }

    static async updateBlog(id: string, updateData: UpdateBlogData): Promise<boolean> {
        const res = await BlogModel.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl
            }
        })
        return !!res.matchedCount;
    }

    static async deleteBlog(id: string): Promise<boolean> {
        const res = await BlogModel.deleteOne({_id: new ObjectId(id)});

        return !!res.deletedCount;
    }
}