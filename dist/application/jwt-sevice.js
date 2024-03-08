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
exports.jwtService = void 0;
const settings_1 = require("./settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtService = {
    getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO type?
                const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
                const userId = result.userId;
                return userId;
            }
            catch (error) {
                return null;
            }
        });
    },
    createAccessToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ userId }, settings_1.settings.JWT_SECRET, { expiresIn: settings_1.settings.ACCESS_TOKEN_EXPIRY });
        });
    },
    /**
     * HW 8
     */
    // async createRefreshToken(userId: string, expiresIn: string = '20s') {
    //     return jwt.sign({userId}, settings.JWT_SECRET, {expiresIn});
    // },
    /**
     * NW9
     * @param refreshToToken
     */
    createRefreshToken(id, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = jsonwebtoken_1.default.sign({
                id: id,
                deviceId: deviceId
            }, settings_1.settings.JWT_SECRET, { expiresIn: settings_1.settings.REFRESH_TOKEN_EXPIRY });
            return refreshToken.toString();
        });
    },
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    getPayloadFromToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.decode(token);
            const userId = decodedToken.id;
            const deviceId = decodedToken.deviceId;
            const iatDate = (new Date(decodedToken.iat * 1000)).toISOString();
            const expDate = (new Date(decodedToken.exp * 1000)).toISOString();
            return { userId, deviceId, iatDate, expDate };
        }
        catch (e) {
            return null;
        }
    },
};
//# sourceMappingURL=jwt-sevice.js.map