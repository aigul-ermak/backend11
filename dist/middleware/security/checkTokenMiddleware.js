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
exports.checkTokenMiddleware = void 0;
const jwt_sevice_1 = require("../../application/jwt-sevice");
const checkTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const user = req.user;
    if (!user) {
        res.sendStatus(404);
        return;
    }
    if (!refreshToken || refreshToken == null) {
        res.sendStatus(404);
        return;
    }
    const payload = jwt_sevice_1.jwtService.getPayloadFromToken(refreshToken);
    if (payload == null) {
        res.sendStatus(401);
        return;
    }
    const tokenExpDate = Number(payload.expDate);
    if (tokenExpDate < (new Date().getTime() + 1) / 1000) {
        res.sendStatus(401);
        return;
    }
    const userId = payload.userId;
    if (user.id !== userId) {
        res.sendStatus(403);
        return;
    }
    return next();
});
exports.checkTokenMiddleware = checkTokenMiddleware;
//# sourceMappingURL=checkTokenMiddleware.js.map