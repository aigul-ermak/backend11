"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepo = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
class BlogRepo {
    static createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogCollection.insertOne(data);
            return result.insertedId.toString();
        });
    }
    static updateBlog(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                }
            });
            return !!res.matchedCount;
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!res.deletedCount;
        });
    }
}
exports.BlogRepo = BlogRepo;
//# sourceMappingURL=blog-repo.js.map