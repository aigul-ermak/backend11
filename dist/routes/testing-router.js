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
exports.testingRouter = void 0;
const express_1 = require("express");
const blog_1 = require("../models/blog");
const post_1 = require("../models/post");
const user_1 = require("../models/user");
const security_1 = require("../models/security");
const request_1 = require("../models/request");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_1.BlogModel.deleteMany({});
    yield post_1.PostModel.deleteMany({});
    yield user_1.UserModel.deleteMany({});
    yield security_1.SessionModel.deleteMany({});
    yield request_1.RequestModel.deleteMany({});
    res.sendStatus(204);
}));
//# sourceMappingURL=testing-router.js.map