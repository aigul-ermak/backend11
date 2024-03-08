import {CreateBlogData, UpdateBlogData} from "../../types/blog/input";
import {BlogType} from "../../types/blog/output";
import {blogCollection} from "../../db";
import {ObjectId} from "mongodb";


export class BlogRepo {
    static async createBlog(data: BlogType) : Promise<string> {
        const result = await blogCollection.insertOne(data);
        return result.insertedId.toString();
    }

    static async updateBlog(id: string, updateData: UpdateBlogData): Promise<boolean> {
        const res = await blogCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl
            }
        })
        return !!res.matchedCount;
    }

    static async deleteBlog(id: string): Promise<boolean> {
        const res = await blogCollection.deleteOne({_id: new ObjectId(id)});

        return !!res.deletedCount;
    }
}