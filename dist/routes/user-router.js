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
exports.userRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth/auth-middleware");
const query_user_repo_1 = require("../repositories/user-repo/query-user-repo");
const user_service_1 = require("../services/user-service");
const user_validator_1 = require("../validators/user-validator");
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm
    };
    const users = yield query_user_repo_1.QueryUserRepo.getAllUsers(sortData);
    res.status(200).send(users);
}));
exports.userRouter.post('/', auth_middleware_1.authMiddleware, (0, user_validator_1.userValidation)(), 
//usersExistsValidation(),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_service_1.UserService.createUser(req.body.login, req.body.password, req.body.email);
    if (newUser) {
        res.status(201).send(newUser);
    }
    else {
        res.sendStatus(401);
    }
}));
exports.userRouter.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(userId);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
//# sourceMappingURL=user-router.js.map