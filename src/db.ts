import {BlogType} from "./types/blog/output";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv'
import {PostType} from "./types/post/output";
import {UserType} from "./types/user/output";
import {CommentType} from "./types/comment/output";
import {ipUrlType} from "./types/security/output";
import {SessionType} from "./types/token/output";
import mongoose from "mongoose";


dotenv.config()

const dbName = 'home_works'
const mongoURI = process.env.MONGO_URL|| `mongodb://0.0.0.0:27017/${dbName}`


// const url = process.env.MONGO_URL;
// console.log('url: ', url)
// if (!url) {
//     throw new Error('! Url doesn\'t found');
// }
// export const client = new MongoClient(url);
// const db = client.db();
// export const blogCollection = db.collection<BlogType>('blogs');
// export const postCollection = db.collection<PostType>('post');
// export const userCollection = db.collection<UserType>('user');
// export const commentCollection = db.collection<CommentType>('comment');
// //export const usedTokenCollection = db.collection<TokenType>('token');
// export const sessionCollection = db.collection<SessionType>('session');
// export const requestCollection = db.collection<ipUrlType>("apirequest")

// HW 10
export async function runDb() {
    try {
        await mongoose.connect(mongoURI)
        console.log('it is ok')
    } catch (e) {
        console.log('no connection')
        await mongoose.disconnect()
    }
}

// before HW 10

// export const runDb = async () => {
//     try {
//         await client.db("admin").command({ping: 1})
//         console.log('Connected successfully to server');
//     } catch (e) {
//         console.log('! Don\'t connected successfully to server');
//         console.log(e)
//         await client.close();
//     }
// };