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
// const config = client.config();
// export const blogCollection = config.collection<BlogType>('blogs');
// export const postCollection = config.collection<PostType>('post');
// export const userCollection = config.collection<UserType>('user');
// export const commentCollection = config.collection<CommentType>('comment');
// //export const usedTokenCollection = config.collection<TokenType>('token');
// export const sessionCollection = config.collection<SessionType>('session');
// export const requestCollection = config.collection<ipUrlType>("apirequest")

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
//         await client.config("admin").command({ping: 1})
//         console.log('Connected successfully to server');
//     } catch (e) {
//         console.log('! Don\'t connected successfully to server');
//         console.log(e)
//         await client.close();
//     }
// };