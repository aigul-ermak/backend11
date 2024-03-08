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
const db_1 = require("../../db");
class QuerySecurityRepo {
    static putSessionToList(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.sessionCollection.insertOne(session);
            return result;
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
            const result = yield db_1.sessionCollection.updateOne(filter, updateDoc);
            return result;
        });
    }
    static deleteSessionFromList(id, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield id;
            const result = yield db_1.sessionCollection.deleteOne({ userId, deviceId });
            return result.deletedCount > 0;
        });
    }
    static checkTokenInList(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield db_1.sessionCollection.findOne({ refreshToken });
            return token;
        });
    }
    static checkRefreshTokenInList(id, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield db_1.sessionCollection.findOne({ userId: id, deviceId: deviceId });
            return token;
        });
    }
    static findSessionByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield db_1.sessionCollection.findOne({ deviceId });
            return session;
        });
    }
}
exports.QuerySecurityRepo = QuerySecurityRepo;
//# sourceMappingURL=query-security-repo.js.map