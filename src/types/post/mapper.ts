import {WithId} from "mongodb";
import {BlogType, OutputItemBlogType} from "../blog/output";
import {OutputItemPostType, PostType} from "./output";
import {shortDescriptionValidation} from "../../validators/post-validator";

export const postMapper = (post: WithId<PostType>): OutputItemPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}