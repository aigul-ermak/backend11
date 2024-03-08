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
exports.securityRouter = void 0;
const express_1 = require("express");
const security_service_1 = require("../domain/security-service");
const refreshTokenMiddleware_1 = require("../middleware/auth/refreshTokenMiddleware");
const cookie_middleware_1 = require("../middleware/auth/cookie_middleware");
exports.securityRouter = (0, express_1.Router)({});
/**
 * HW 9 returns all devices with active sessions to current user
 */
exports.securityRouter.get('/devices', cookie_middleware_1.cookieMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    const devices = yield security_service_1.SecurityService.getActiveDevices(token);
    if (devices == null)
        return res.status(401);
    return res.status(200).send(devices);
}));
/**
 * terminate all devices (exclude current) device's sessions
 */
exports.securityRouter.delete('/devices', cookie_middleware_1.cookieMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    yield security_service_1.SecurityService.deleteSpecifiedDeviceSession(refreshToken);
    return res.sendStatus(204);
}));
/**
 * terminate specified device session
 */
exports.securityRouter.delete('/devices/:deviceId', cookie_middleware_1.cookieMiddleware, refreshTokenMiddleware_1.deviceCheckMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    const deviceId = req.params.deviceId;
    //const payload: RefreshToken | null = jwtService.getPayloadFromToken(refreshToken);
    yield security_service_1.SecurityService.deleteDeviceSession(refreshToken, deviceId);
    return res.sendStatus(204);
}));
//# sourceMappingURL=security-router.js.map