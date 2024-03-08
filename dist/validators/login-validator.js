"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middleware/inputModel/input-model-validation");
const loginOrEmailValidation = (0, express_validator_1.body)('loginOrEmail')
    .exists()
    .isString()
    .withMessage('Invalid login or email!');
const passwordValidation = (0, express_validator_1.body)('password')
    .exists()
    .isString()
    .withMessage('Invalid password!');
const userAuthValidation = () => [loginOrEmailValidation, passwordValidation, input_model_validation_1.inputModelValidation];
exports.userAuthValidation = userAuthValidation;
//# sourceMappingURL=login-validator.js.map