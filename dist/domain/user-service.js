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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const query_user_repo_1 = require("../repositories/user-repo/query-user-repo");
const user_repo_1 = require("../repositories/user-repo/user-repo");
const add_1 = require("date-fns/add");
class UserService {
    static createUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                accountData: {
                    login,
                    email,
                    passwordHash,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: "",
                    expirationDate: (0, add_1.add)(new Date(), {
                        hours: 1,
                        minutes: 3
                    }),
                    isConfirmed: false
                }
            };
            const userId = yield user_repo_1.UserRepo.createUser(newUser);
            const user = yield query_user_repo_1.QueryUserRepo.findUserById(userId);
            if (!user) {
                return null;
            }
            return {
                id: user.id,
                login: newUser.accountData.login,
                email: newUser.accountData.email,
                createdAt: newUser.accountData.createdAt
            };
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
    //TODO check type user
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
    static _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(password, salt);
            return hash;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map