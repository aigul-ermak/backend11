import {Router, Request, Response} from "express";
import {blogCollection, postCollection, requestCollection, sessionCollection, userCollection} from "../db";

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {

     await blogCollection.deleteMany({});
     await postCollection.deleteMany({});
     await userCollection.deleteMany({});
     await sessionCollection.deleteMany({});
     await requestCollection.deleteMany({});

     res.sendStatus(204)
})