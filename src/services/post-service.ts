import {QueryBlogRepo} from "../repositories/blog-repo/query-blog-repo";
import {CreatePostData, UpdatePostData} from "../types/post/input";
import {PostRepo} from "../repositories/post-repo/post-repo";
import {QueryPostRepo} from "../repositories/post-repo/query-post-repo";
import {PostDBType} from "../types/post/output";
import {PostModel} from "../models/post";

export class PostService {
    static async createPost(newData: CreatePostData): Promise<string | null> {

        const blog = await QueryBlogRepo.getBlogById(newData.blogId)

        if (!blog) {
            throw new Error('Blog not found');
        }

        const newPost: PostDBType = {
            ...newData,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }

        const postId = await PostRepo.createPost(newPost);

        return postId;
    }


    static async updatePost(postId: string, updateData: UpdatePostData) {

        const blog = await QueryBlogRepo.getBlogById(updateData.blogId)

        if(!blog) {
            return false;
        }

        updateData.blogName = blog.name;
        return await PostRepo.updatePost(postId, updateData);
    }

    // static async deleteBlog(postId: string) {
    //     const postExists = await QueryPostRepo.getPostById(postId)
    //     if (!postExists) {
    //         throw new Error('Post not found');
    //     }
    //     await PostRepo.deletePost(postId)
    // }
}