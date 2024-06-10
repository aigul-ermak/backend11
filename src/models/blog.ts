import mongoose, { Schema, model, Document } from 'mongoose';

export const blogSchema = new mongoose.Schema({
    name: String,
    description: String,
    websiteUrl: String
})

export const BlogModel = mongoose.model('Blog', blogSchema)