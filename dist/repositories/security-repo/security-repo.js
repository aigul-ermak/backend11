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
exports.SecurityRepo = void 0;
const security_1 = require("../../models/security");
const request_1 = require("../../models/request");
class SecurityRepo {
    static deleteDeviceToken(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield security_1.SessionModel.deleteOne({ userId, deviceId });
            return result.deletedCount > 0;
        });
    }
    static deleteSpecifiedDeviceToken(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield security_1.SessionModel.deleteMany({ userId: userId, deviceId: { $ne: deviceId } });
            return result.deletedCount > 0;
        });
    }
    static insertRequestFromUser(requestUser) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO type
            const res = yield request_1.RequestModel.create(requestUser);
            return res._id.toString();
        });
    }
    static countRequests(ip, url, fromDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield request_1.RequestModel.countDocuments({
                ip,
                url,
                date: { $gte: fromDate }
            });
            return count;
        });
    }
}
exports.SecurityRepo = SecurityRepo;
//# sourceMappingURL=security-repo.js.map