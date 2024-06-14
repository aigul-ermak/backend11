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
exports.QuerySecurityRepo = void 0;
const security_1 = require("../../models/security");
class QuerySecurityRepo {
    static putSessionToList(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield security_1.SessionModel.create(session);
            return res._id.toString();
        });
    }
    static updateSessionToList(userId, deviceId, iatDate, expDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { userId: userId, deviceId: deviceId };
            const updateDoc = {
                $set: {
                    iatDate: iatDate,
                    expDate: expDate
                }
            };
            const result = yield security_1.SessionModel.updateOne(filter, updateDoc);
            return result;
        });
    }
    static deleteSessionFromList(id, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield id;
            const result = yield security_1.SessionModel.deleteOne({ userId, deviceId });
            return result.deletedCount > 0;
        });
    }
    static checkTokenInList(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield security_1.SessionModel.findOne({ refreshToken });
            return token;
        });
    }
    static checkRefreshTokenInList(id, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield security_1.SessionModel.findOne({ userId: id, deviceId: deviceId });
            return token;
        });
    }
    static findSessionByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield security_1.SessionModel.findOne({ deviceId });
            return session;
        });
    }
}
exports.QuerySecurityRepo = QuerySecurityRepo;
//# sourceMappingURL=query-security-repo.js.map