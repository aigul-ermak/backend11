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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const query_user_repo_1 = require("../repositories/user-repo/query-user-repo");
const user_repo_1 = require("../repositories/user-repo/user-repo");
const email_manager_1 = require("../managers/email-manager");
const uuid_1 = require("uuid");
const add_1 = require("date-fns/add");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../application/settings");
const user_service_1 = require("./user-service");
const jwt_sevice_1 = require("../application/jwt-sevice");
const query_security_repo_1 = require("../repositories/security-repo/query-security-repo");
class authService {
    static createUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsUser = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(email);
            if (existsUser !== null) {
                return null;
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                accountData: {
                    login: login,
                    email: email,
                    passwordHash,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, add_1.add)(new Date(), {
                        hours: 1,
                        minutes: 3
                    }),
                    isConfirmed: false
                }
            };
            const result = yield user_repo_1.UserRepo.createUser(newUser);
            // HW 7
            yield email_manager_1.emailManager.sendEmailConfirmationMessage(newUser);
            return result;
        });
    }
    static createAccessRefreshTokens(user, deviceId, userIP, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield jwt_sevice_1.jwtService.createAccessToken(user.id);
            const refreshToken = yield jwt_sevice_1.jwtService.createRefreshToken(user.id, deviceId);
            return { accessToken, refreshToken };
        });
    }
    static refreshTokens(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_sevice_1.jwtService.getPayloadFromToken(token);
            if (!payload)
                return null;
            const accessToken = yield jwt_sevice_1.jwtService.createAccessToken(payload.userId);
            const refreshToken = yield jwt_sevice_1.jwtService.createRefreshToken(payload.userId, payload.deviceId);
            if (!refreshToken)
                return null;
            const newPayload = jwt_sevice_1.jwtService.getPayloadFromToken(refreshToken);
            if (!newPayload)
                return null;
            const iatDate = newPayload.iatDate;
            const expDate = newPayload.expDate;
            let result = yield query_security_repo_1.QuerySecurityRepo.updateSessionToList(payload.userId, payload.deviceId, iatDate, expDate);
            return ({ accessToken, refreshToken });
        });
    }
    static checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(loginOrEmail);
            if (!user || !user.accountData.passwordHash) {
                return null;
            }
            const isPasswordMatch = yield bcrypt_1.default.compare(password, user.accountData.passwordHash);
            if (isPasswordMatch)
                return user;
            else
                return null;
        });
    }
    static findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_user_repo_1.QueryUserRepo.findUserById(userId);
            if (!user) {
                return null;
            }
            return user;
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield query_user_repo_1.QueryUserRepo.findUserById(userId);
            if (!userExists) {
                return null;
            }
            yield user_repo_1.UserRepo.deleteUser(userId);
            return true;
        });
    }
    //HW 7
    static checkAndFindUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
                //const user :OutputUserItemType | null  = await UserService.findUserById(new ObjectId(result.userId))
                const user = yield user_service_1.UserService.findUserById(result.userId);
                return user;
            }
            catch (e) {
                return null;
            }
        });
    }
    //HW 7
    static confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_user_repo_1.QueryUserRepo.findUserByConfirmationCode(code);
            if (!user)
                return false;
            if (user.emailConfirmation.confirmationCode === code) {
                let result = yield user_repo_1.UserRepo.updateConfirmation(user.id);
                return result;
            }
            return false;
        });
    }
    //HW 7
    static sendNewCodeToEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCode = (0, uuid_1.v4)();
            let user = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(email);
            yield user_repo_1.UserRepo.updateCode(user === null || user === void 0 ? void 0 : user.id, newCode);
            let userWithNewCode = yield query_user_repo_1.QueryUserRepo.findByLoginOrEmail(email);
            yield email_manager_1.emailManager.sendEmailMessage(userWithNewCode);
            return true;
        });
    }
    static logoutUser(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt_sevice_1.jwtService.getPayloadFromToken(refreshToken);
            if (!payload)
                return null;
            const userId = payload === null || payload === void 0 ? void 0 : payload.userId;
            const deviceId = payload === null || payload === void 0 ? void 0 : payload.deviceId;
            const result = yield query_security_repo_1.QuerySecurityRepo.deleteSessionFromList(userId, deviceId);
            if (!result)
                return null;
            return true;
        });
    }
}
exports.authService = authService;
//# sourceMappingURL=auth-service.js.map