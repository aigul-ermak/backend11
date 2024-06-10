import {BlogRepo} from "../repositories/blog-repo/blog-repo";
import {CreateBlogData, UpdateBlogData} from "../types/blog/input";
import {QueryBlogRepo} from "../repositories/blog-repo/query-blog-repo";
import {QueryPostRepo} from "../repositories/post-repo/query-post-repo";
import {PostRepo} from "../repositories/post-repo/post-repo";
import {OutputItemPostType,  PostType} from "../types/post/output";
import {BlogType, OutputItemBlogType} from "../types/blog/output";
import {BlogModel} from "../models/blog";


export class BlogService {
    static async createBlog(newData: CreateBlogData): Promise<OutputItemBlogType | null> {

        const newBlog: BlogType = {
            ...newData,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const blogId: string | null = await BlogRepo.createBlog(newBlog);
        if (!blogId) {
            return null;
        }

        const blog: OutputItemBlogType | null = await QueryBlogRepo.getBlogById(blogId)

        if (!blog) {
            return null;
        }
        return blog;
    }

    // static async createPostToBlog(blogId: string, postData: {
    //     title: string,
    //     shortDescription: string,
    //     content: string
    // }): Promise<OutputItemPostType | null> {
    //     const blog: OutputItemBlogType | null = await QueryBlogRepo.getBlogById(blogId)
    //
    //     if (!blog) {
    //         return null;
    //     }
    //
    //     const newPost: PostType = {
    //         ...postData,
    //         blogId: blogId,
    //         blogName: blog.name,
    //         createdAt: new Date().toISOString()
    //     }
    //
    //     const postId: string = await PostRepo.createPostToBlog(newPost)
    //
    //     if (!postId) {
    //         return null;
    //     }
    //
    //     const post: OutputItemPostType | null = await QueryPostRepo.getPostById(postId);
    //     return post;
    // }

    // static async updateBlog(blogId: string, updateData: UpdateBlogData): Promise<boolean> {
    //
    //     const blog: OutputItemBlogType | null = await QueryBlogRepo.getBlogById(blogId);
    //
    //     if (!blog) {
    //         return false;
    //     }
    //
    //     return await BlogModel.updateBlog(blogId, updateData)
    // }

    // static async deleteBlog(blogId: string): Promise<true | null> {
    //
    //     const blogExists: OutputItemBlogType | null = await QueryBlogRepo.getBlogById(blogId)
    //
    //     if (!blogExists) {
    //         return null;
    //     }
    //
    //     await BlogModel.deleteBlog(blogId)
    //     return true
    // }
}


