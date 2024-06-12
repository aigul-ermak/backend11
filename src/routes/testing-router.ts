import {Router, Request, Response} from "express";
import {BlogModel} from "../models/blog";
import {PostModel} from "../models/post";


export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {

     await BlogModel.deleteMany({});
     await PostModel.deleteMany({});
     // await userCollection.deleteMany({});
     // await sessionCollection.deleteMany({});
     // await requestCollection.deleteMany({});

     res.sendStatus(204)
})