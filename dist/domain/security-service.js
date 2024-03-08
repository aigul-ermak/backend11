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
exports.SecurityService = void 0;
const jwt_sevice_1 = require("../application/jwt-sevice");
const security_repo_1 = require("../repositories/security-repo/security-repo");
const query_security_repo_1 = require("../repositories/security-repo/query-security-repo");
const db_1 = require("../db");
class SecurityService {
    static getUserIdFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_sevice_1.jwtService.getPayloadFromToken(token);
            if (!payload) {
                return null;
            }
            return payload.userId;
        });
    }
    static getActiveDevices(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_sevice_1.jwtService.getPayloadFromToken(token);
            if (!payload)
                return null;
            const activeDevices = yield db_1.sessionCollection.find({
                "userId": payload.userId
            }).toArray();
            const transformedDevices = activeDevices.map(device => {
                return {
                    ip: device.ip,
                    title: device.title,
                    lastActiveDate: device.iatDate,
                    deviceId: device.deviceId
                };
            });
            return transformedDevices;
        });
    }
    static createSession(userId, userIp, userAgent, deviceId, tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_sevice_1.jwtService.getPayloadFromToken(tokens.refreshToken);
            if (!payload)
                return null;
            const sessionUser = {
                userId: userId,
                deviceId: deviceId,
                ip: userIp,
                title: userAgent,
                iatDate: payload === null || payload === void 0 ? void 0 : payload.iatDate,
                expDate: payload === null || payload === void 0 ? void 0 : payload.expDate
            };
            const result = yield query_security_repo_1.QuerySecurityRepo.putSessionToList(sessionUser);
            if (!result)
                return null;
            return true;
        });
    }
    static deleteDeviceSession(token, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_sevice_1.jwtService.getPayloadFromToken(token);
            const isDeviceDeleted = yield security_repo_1.SecurityRepo.deleteDeviceToken(payload === null || payload === void 0 ? void 0 : payload.userId, deviceId);
            return isDeviceDeleted;
        });
    }
    static deleteSpecifiedDeviceSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_sevice_1.jwtService.getPayloadFromToken(token);
            const isDeviceDeleted = yield security_repo_1.SecurityRepo.deleteSpecifiedDeviceToken(payload === null || payload === void 0 ? void 0 : payload.userId, payload === null || payload === void 0 ? void 0 : payload.deviceId);
            return isDeviceDeleted;
        });
    }
}
exports.SecurityService = SecurityService;
//# sourceMappingURL=security-service.js.map