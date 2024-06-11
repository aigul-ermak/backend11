import {WithId} from "mongodb";
import {BlogDBType, OutputItemBlogType} from "../blog/output";
import {OutputItemPostType, PostDBType} from "./output";
import {shortDescriptionValidation} from "../../validators/post-validator";

export const postMapper = (post: WithId<PostDBType>): OutputItemPostType => {
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