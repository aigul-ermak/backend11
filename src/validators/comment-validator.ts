import {body, param} from "express-validator";
import {inputModelValidation} from "../middleware/inputModel/input-model-validation";


const contentValidation = body('content')
    .exists()
    .isString()
    .trim()
    .isLength({min: 20, max: 300})
    .withMessage('Incorrect comment')

const statusValidation = body('status')
    .exists()
    .isString()
    .trim()
    .withMessage('Status is required')


const commentatorInfoValidation = [
    body('userId')
        .exists()
        .withMessage('User ID is required')
        .isString()
        .withMessage('User ID must be a string'),
    body('userLogin')
        .exists()
        .withMessage('User Login is required')
        .isString()
        .withMessage('User Login must be a string'),
]


export const commentValidation = () => [contentValidation, inputModelValidation]
export const commentStatusValidation = () => [statusValidation, inputModelValidation]



