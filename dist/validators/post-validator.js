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
exports.postValidation = exports.contentValidation = exports.titlePostValidation = exports.shortDescriptionValidation = exports.blogIdValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middleware/inputModel/input-model-validation");
const query_blog_repo_1 = require("../repositories/blog-repo/query-blog-repo");
exports.blogIdValidation = (0, express_validator_1.body)('blogId')
    .isString()
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("Incorrect mongoid blogid")
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_blog_repo_1.QueryBlogRepo.getBlogById(value);
    if (!blog) {
        throw new Error('Blog is not exists');
    }
    return true;
}))
    .withMessage('Incorrect blogId');
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Incorrect short description');
exports.titlePostValidation = (0, express_validator_1.body)('title')
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Incorrect title');
exports.contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Incorrect content');
const postValidation = () => [
    exports.shortDescriptionValidation,
    exports.titlePostValidation,
    exports.contentValidation,
    exports.blogIdValidation,
    input_model_validation_1.inputModelValidation,
];
exports.postValidation = postValidation;
//# sourceMappingURL=post-validator.js.map