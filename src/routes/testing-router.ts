import {Router, Request, Response} from "express";
import {BlogModel} from "../models/blog";


export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {

     await BlogModel.deleteMany({});
     // await postCollection.deleteMany({});
     // await userCollection.deleteMany({});
     // await sessionCollection.deleteMany({});
     // await requestCollection.deleteMany({});

     res.sendStatus(204)
})