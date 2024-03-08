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
exports.authBearerMiddleware = void 0;
const jwt_sevice_1 = require("../../application/jwt-sevice");
const user_service_1 = require("../../domain/user-service");
const authBearerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.send(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const userId = yield jwt_sevice_1.jwtService.getUserIdByToken(token);
    if (!userId) {
        res.sendStatus(401);
        return;
    }
    const user = yield user_service_1.UserService.findUserById(userId);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    req.user = user;
    next();
});
exports.authBearerMiddleware = authBearerMiddleware;
//# sourceMappingURL=auth-bearer-middleware.js.map