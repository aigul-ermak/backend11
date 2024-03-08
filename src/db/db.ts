import {VideoType} from "../types/video/output";
import {BlogType} from "../types/blog/output";
import {PostType} from "../types/post/output";

type DbType = {
    videos: VideoType[],
    blogs: BlogType[],
    posts: PostType[]
}

console.log("db.ts")
export const db: DbType = {
    videos: [{
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-11-11T18:01:12.021Z",
        publicationDate: "2023-11-11T18:01:12.021Z",
        availableResolutions: [
            "P144"
        ]
    }],
    blogs: [
        // {
        //     id: "1",
        //     name: "Blog # 1",
        //     description: "About something",
        //     websiteUrl: "www.blog.som"
        // }
    ],

    posts: [
        // {
        //     id: "1",
        //     title: "post # 1",
        //     shortDescription: "short description",
        //     content: "content",
        //     blogId: "2",
        //     blogName: "my blog name"
        // }
    ]
}