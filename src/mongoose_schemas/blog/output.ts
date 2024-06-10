import mongoose from 'mongoose';
const { Schema } = mongoose;

export const blogSchema = new Schema({
    name: String,
    description: String,
    websiteUrl: String,
    createdAt: String,
    isMembership: Boolean
    // title: String, // String is shorthand for {type: String}
    // author: String,
    // body: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //     votes: Number,
    //     favs: Number
});
