import {Router, Response} from "express";
import {
    RequestBodyAndParams,
    RequestTypeWithQuery,
    RequestTypeWithQueryAndParams,
    RequestWithBody,
    RequestWithParams
} from "../types/common";
import {authMiddleware} from "../middleware/auth/auth-middleware";
import {
    blogPostValidation,
    blogValidation,
    mongoIdInParamValidation
} from "../validators/blog-validator";
import {BlogDBType, OutputBlogType, OutputItemBlogType} from "../types/blog/output";
import {Params} from "./videos-router";
import {CreateBlogData, SortDataType, UpdateBlogData} from "../types/blog/input";
import {BlogService} from "../services/blog-service";
import {QueryBlogRepo} from "../repositories/blog-repo/query-blog-repo";
import {SortPostType} from "../types/post/input";
import {OutputItemPostType, OutputPostType} from "../types/post/output";
import {QueryPostRepo} from "../repositories/post-repo/query-post-repo";


export const blogRouter: Router = Router({})

blogRouter.get('/', async (req: RequestTypeWithQuery<SortDataType>, res: Response<OutputBlogType>) => {

    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const blogs: OutputBlogType = await QueryBlogRepo.getAllBlogs(sortData)
    res.status(200).send(blogs)

})

blogRouter.get('/:id', mongoIdInParamValidation(),
    async (req: RequestWithParams<Params>, res: Response<OutputItemBlogType>) => {

        const blogId: string = req.params.id
        const blog: null | OutputItemBlogType = await QueryBlogRepo.getBlogById(blogId)

        if (!blog) {
            res.sendStatus(404)
        } else {
            res.send(blog)
        }
    })

blogRouter.get('/:id/posts',
    mongoIdInParamValidation(),
    async (req: RequestTypeWithQueryAndParams<{ id: string }, SortPostType>, res: Response<OutputPostType>) => {
        const id: string = req.params.id

        const sortData: SortPostType = {
            sortBy: req.query.sortBy,
            sortDirection: req.query.sortDirection,
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize
        }

        const blog: null | BlogDBType = await QueryBlogRepo.getBlogById(id)

        if (!blog) {
            res.sendStatus(404)
            return
        }

        const posts: OutputPostType = await QueryPostRepo.getPostsByBlogId(id, sortData);

        if (!posts) {
            res.sendStatus(204)
            return
        }
        res.status(200).send(posts)
    })

blogRouter.post('/',
    authMiddleware,
    blogValidation(),
    async (req: RequestWithBody<CreateBlogData>, res: Response<OutputItemBlogType>) => {

        const newData: CreateBlogData = req.body;
        const blog: OutputItemBlogType | null = await BlogService.createBlog(newData);

        if (!blog) {
            res.sendStatus(404)
            return
        }

        res.status(201).send(blog)
    });

blogRouter.post('/:id/posts',
    authMiddleware,
    blogPostValidation(),
    async (req: RequestBodyAndParams<{ id: string }, {
        title: string,
        shortDescription: string,
        content: string
    }>, res: Response<OutputItemPostType>) => {

        const id: string = req.params.id

        const {title, shortDescription , content} = req.body;

        const post : OutputItemPostType | null  = await BlogService.createPostToBlog(id, {title, shortDescription, content})

        if (!post) {
            res.sendStatus(404)
            return
        }

        res.status(201).send(post)

    });

blogRouter.put('/:id',
    authMiddleware,
    blogValidation(),
    async (req: RequestBodyAndParams<Params, UpdateBlogData>, res: Response) => {
        const updateData = req.body;
        const id = req.params.id;

        let isBlogUpdated = await BlogService.updateBlog(id, updateData);

        if (isBlogUpdated) {
            res.sendStatus(204);
            return
        }
       res.sendStatus(404);
    });

blogRouter.delete('/:id',
    authMiddleware,
    async (req: RequestWithParams<{id: string }>, res: Response) => {

        const id = req.params.id;

        const result = await BlogService.deleteBlog(id);

        if (!result) {
            res.sendStatus(404);
            return
        }
       res.sendStatus(204);

    })