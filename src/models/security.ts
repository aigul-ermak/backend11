import mongoose, {Schema, model, Document} from 'mongoose';
import {BlogDBType} from "../types/blog/output";
import {CommentDBType} from "../types/comment/output";
import {UserDBType} from "../types/user/output";

//TODO type?
const deviceSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    title: { type: String, required: true },
    lastActiveDate: { type: String, required: true },
    deviceId: { type: String, required: true }
});

export const SessionModel = mongoose.model('Device', deviceSchema);
