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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countMiddleware = exports.sessionRefreshTokeMiddleware = exports.cookieMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../../application/settings");
const query_security_repo_1 = require("../../repositories/security-repo/query-security-repo");
const jwt_sevice_1 = require("../../application/jwt-sevice");
const security_repo_1 = require("../../repositories/security-repo/security-repo");
const cookieMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
        if (!result) {
            res.sendStatus(401);
            return;
        }
        next();
    }
    catch (_b) {
        res.sendStatus(401);
        return;
    }
});
exports.cookieMiddleware = cookieMiddleware;
const sessionRefreshTokeMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.refreshToken;
    const payload = yield jwt_sevice_1.jwtService.getPayloadFromToken(token);
    console.log(payload);
    if (!payload) {
        res.sendStatus(401);
        return;
    }
    const sessionExists = yield query_security_repo_1.QuerySecurityRepo.checkRefreshTokenInList(payload.userId, payload.deviceId);
    if (!sessionExists) {
        res.sendStatus(401);
        return;
    }
    if (sessionExists.iatDate != payload.iatDate) {
        res.sendStatus(401);
        return;
    }
    next();
});
exports.sessionRefreshTokeMiddleware = sessionRefreshTokeMiddleware;
const countMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ipUser = req.ip;
    const urlUser = req.originalUrl; // /login/regi
    const currentTime = new Date();
    yield security_repo_1.SecurityRepo.insertRequestFromUser({
        ip: ipUser,
        url: urlUser,
        date: currentTime,
    });
    const tenSecondsAgo = new Date(currentTime.getTime() - 10000);
    const count = yield security_repo_1.SecurityRepo.countRequests(ipUser, urlUser, tenSecondsAgo);
    if (count > 5) {
        res.sendStatus(429);
        return;
    }
    next();
});
exports.countMiddleware = countMiddleware;
//# sourceMappingURL=cookie_middleware.js.map