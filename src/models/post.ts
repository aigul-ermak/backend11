import mongoose, { Schema, Document, model } from 'mongoose';




export const postSchema = new mongoose.Schema({
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
})

export const PostModel = mongoose.model('Post', postSchema);