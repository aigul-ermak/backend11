"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdInParamValidation = exports.blogPostValidation = exports.blogValidation = exports.mongoIdValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middleware/inputModel/input-model-validation");
const post_validator_1 = require("./post-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .exists()
    .isString()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Incorrect name!');
const descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Incorrect description!');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches('^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$')
    .withMessage('Incorrect websiteUrl!');
exports.mongoIdValidation = (0, express_validator_1.param)('id')
    .isMongoId()
    .withMessage('Incorrect id!');
const blogValidation = () => [nameValidation, descriptionValidation, websiteUrlValidation, input_model_validation_1.inputModelValidation];
exports.blogValidation = blogValidation;
const blogPostValidation = () => [exports.mongoIdValidation, post_validator_1.shortDescriptionValidation, post_validator_1.titlePostValidation, post_validator_1.contentValidation, input_model_validation_1.inputModelValidation];
exports.blogPostValidation = blogPostValidation;
const mongoIdInParamValidation = () => [exports.mongoIdValidation, input_model_validation_1.inputModelValidation,];
exports.mongoIdInParamValidation = mongoIdInParamValidation;
//# sourceMappingURL=blog-validator.js.map