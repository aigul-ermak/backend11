import {Router} from "express";
import {commentValidation} from "../validators/comment-validator";
import {mongoIdInParamValidation} from "../validators/blog-validator";
import {authBearerMiddleware} from "../middleware/auth/auth-bearer-middleware";

import {commentController} from "../composition-root";

export const commentRouter: Router = Router({})

commentRouter.get('/:id', commentController.getCommentById.bind(commentController))

//commentRouter.put('/:id/like-status', authBearerMiddleware, mongoIdInParamValidation(), commentStatusValidation(), commentController.makeLike.bind(commentController))
commentRouter.put('/:id/like-status', authBearerMiddleware, mongoIdInParamValidation(), commentController.makeLike.bind(commentController))

commentRouter.put('/:id', authBearerMiddleware, mongoIdInParamValidation(), commentValidation(), commentController.updateComment.bind(commentController))

commentRouter.delete('/:id', authBearerMiddleware, mongoIdInParamValidation(), commentController.deleteComment.bind(commentController));