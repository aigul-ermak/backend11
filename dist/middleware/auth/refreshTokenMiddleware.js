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
exports.refreshTokenMiddleware = exports.deviceCheckMiddleware = void 0;
const jwt_sevice_1 = require("../../application/jwt-sevice");
const query_security_repo_1 = require("../../repositories/security-repo/query-security-repo");
const deviceCheckMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const deviceId = req.params.deviceId;
    if (!refreshToken) {
        res.sendStatus(404);
        return;
    }
    const payload = jwt_sevice_1.jwtService.getPayloadFromToken(refreshToken);
    if (!payload) {
        res.sendStatus(404);
        return;
    }
    const session = yield query_security_repo_1.QuerySecurityRepo.findSessionByDeviceId(deviceId);
    if (!session) {
        res.sendStatus(404);
        return;
    }
    if (session.userId !== payload.userId) {
        res.sendStatus(403);
        return;
    }
    next();
});
exports.deviceCheckMiddleware = deviceCheckMiddleware;
const refreshTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
        return;
    }
    const payload = jwt_sevice_1.jwtService.getPayloadFromToken(refreshToken);
    if (!payload) {
        res.sendStatus(401);
        return;
    }
    next();
});
exports.refreshTokenMiddleware = refreshTokenMiddleware;
//# sourceMappingURL=refreshTokenMiddleware.js.map