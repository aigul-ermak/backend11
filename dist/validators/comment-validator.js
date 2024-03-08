"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middleware/inputModel/input-model-validation");
const contentValidation = (0, express_validator_1.body)('content')
    .exists()
    .isString()
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage('Incorrect comment');
const commentatorInfoValidation = [
    (0, express_validator_1.body)('userId')
        .exists()
        .withMessage('User ID is required')
        .isString()
        .withMessage('User ID must be a string'),
    (0, express_validator_1.body)('userLogin')
        .exists()
        .withMessage('User Login is required')
        .isString()
        .withMessage('User Login must be a string'),
];
const commentValidation = () => [contentValidation, input_model_validation_1.inputModelValidation];
exports.commentValidation = commentValidation;
//# sourceMappingURL=comment-validator.js.map