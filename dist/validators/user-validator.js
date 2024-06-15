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
exports.recoveryCodeValidation = exports.userCodeValidation = exports.userEmailValidation = exports.userValidation = exports.mongoIdValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middleware/inputModel/input-model-validation");
const query_user_repo_1 = require("../repositories/user-repo/query-user-repo");
const loginValidation = (0, express_validator_1.body)('login')
    .exists()
    .isString()
    .trim()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('Invalid login!')
    .custom((login) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(login);
    // TODO ask
    if (user) {
        throw new Error('User already exists.');
    }
    return true;
}))
    .withMessage('User already exists.');
// const emailValidation = body('email')
//     .isString()
//     .trim()
//     .notEmpty().withMessage('Email is required')
//     .normalizeEmail()
//     .matches('^[a-zA-Z0-9_-]*$').withMessage('Email contains invalid characters')
//     .isEmail().withMessage('Invalid email!');
const passwordValidation = (0, express_validator_1.body)('password')
    .exists()
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Invalid password!');
exports.mongoIdValidation = (0, express_validator_1.param)('id')
    .isMongoId()
    .withMessage('Incorrect id!');
const emailValidation = (0, express_validator_1.body)('email')
    .isString()
    .trim()
    .notEmpty().withMessage('Email is required')
    .normalizeEmail()
    //.matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .isEmail().withMessage('Invalid email!')
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(email);
    // TODO ask
    if (user) {
        throw new Error('User already exists.');
    }
    return true;
}))
    .withMessage('User already exists.');
const codeValidation = (0, express_validator_1.body)('code')
    .isString()
    .custom((code) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield query_user_repo_1.QueryUserRepo.findUserByConfirmationCode(code);
    if (!userExists) {
        throw new Error('Code not valid (User do not found)');
    }
    if (!(userExists.emailConfirmation.expirationDate > new Date())) {
        throw new Error('Code not valid (Date problem)');
    }
    if (userExists.emailConfirmation.isConfirmed) {
        throw new Error('Code not valid (User already confirmed)');
    }
    return true;
}));
const recCodeValidation = (0, express_validator_1.body)('code')
    .isString()
    .custom((code) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield query_user_repo_1.QueryUserRepo.findUserByRecoveryCode(code);
    if (!userExists) {
        throw new Error('Code not valid (User do not found)');
    }
    const currentDate = new Date();
    if (!userExists.accountData.recoveryCodeExpirationDate || userExists.accountData.recoveryCodeExpirationDate <= currentDate) {
        throw new Error('Code not valid (Date problem)');
    }
    return true;
}));
const emailExistsValidation = (0, express_validator_1.body)('email')
    .isString()
    .trim()
    .normalizeEmail()
    //.matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .isEmail().withMessage('Invalid email!')
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(email);
    if (!userExists) {
        throw new Error('Email is not valid (User do not found)');
    }
    if (userExists.emailConfirmation.isConfirmed) {
        throw new Error('Code not valid (User already confirmed)');
    }
    return true;
}));
const userValidation = () => [loginValidation, emailValidation, passwordValidation, input_model_validation_1.inputModelValidation];
exports.userValidation = userValidation;
const userEmailValidation = () => [emailExistsValidation, input_model_validation_1.inputModelValidation];
exports.userEmailValidation = userEmailValidation;
const userCodeValidation = () => [codeValidation, input_model_validation_1.inputModelValidation];
exports.userCodeValidation = userCodeValidation;
const recoveryCodeValidation = () => [recCodeValidation, input_model_validation_1.inputModelValidation];
exports.recoveryCodeValidation = recoveryCodeValidation;
//export const userEmailValidation = () => [emailValidation, inputModelValidation];
// export const usersValidation = param('email')
//     .exists().withMessage('Email parameter is required.')
//     .isEmail().withMessage('Invalid email format.')
//     .custom(async (email) => {
//         const user = await QueryUserRepo.findByLoginOrEmail(email);
//         if (user) {
//             return Promise.reject('User already exists.');
//         }
//     })
//export const usersExistsValidation = () => [usersValidation, inputModelValidation];
//export const userValidation = () =>  [loginValidation, emailValidation, passwordValidation, inputModelValidation]
//# sourceMappingURL=user-validator.js.map