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
exports.QueryUserRepo = void 0;
const mongodb_1 = require("mongodb");
const mapper_1 = require("../../types/user/mapper");
const user_1 = require("../../models/user");
const security_1 = require("../../models/security");
class QueryUserRepo {
    static getAllUsers(sortData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            const searchLoginTerm = (_e = sortData.searchLoginTerm) !== null && _e !== void 0 ? _e : null;
            const searchEmailTerm = (_f = sortData.searchEmailTerm) !== null && _f !== void 0 ? _f : null;
            // const filter: FilterQuery<User> = {
            //     $or: [
            //         { 'accountData.email': { $regex: formattedSortData.searchEmailTerm ?? '', $options: 'i' } },
            //         { 'accountData.login': { $regex: formattedSortData.searchLoginTerm ?? '', $options: 'i' } },
            //     ],
            // };
            let filter = { $or: [] };
            if (searchEmailTerm) {
                (_g = filter['$or']) === null || _g === void 0 ? void 0 : _g.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
            }
            if (searchLoginTerm) {
                (_h = filter['$or']) === null || _h === void 0 ? void 0 : _h.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
            }
            if (((_j = filter['$or']) === null || _j === void 0 ? void 0 : _j.length) === 0) {
                (_k = filter['$or']) === null || _k === void 0 ? void 0 : _k.push({});
            }
            //const users: WithId<UserType>[] = await UserModel
            //TODO any here
            const users = yield user_1.UserModel
                .find(filter)
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip((pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .exec();
            //.toArray()
            const totalCount = yield user_1.UserModel.countDocuments(filter);
            const pageCount = Math.ceil(totalCount / +pageSize);
            console.log(users);
            return {
                pagesCount: pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: totalCount,
                items: users.map(mapper_1.userMapper)
            };
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({ 'accountData.email': email });
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    }
    static findByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({
                $or: [{ 'accountData.email': loginOrEmail }, { 'accountData.login': loginOrEmail }]
            });
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    }
    static findUserByConfirmationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({ "emailConfirmation.confirmationCode": code });
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    }
    static checkUserExistByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield security_1.SessionModel.findOne({ 'accountData.email': email });
            return user !== null;
        });
    }
    static findUserByRecoveryCode(recoveryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.findOne({ "accountData.passwordRecoveryCode": recoveryCode });
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    }
    // static async findUserByRecoveryCode(recoveryCode: string): Promise<UserDBType | null> {
    //     return await SessionModel.findOne({'emailConfirmation.confirmationCode': recoveryCode});
    // }
    //TODO type??
    static updatePassword(userId, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.UserModel.updateOne({ _id: userId }, { $set: { 'accountData.passwordHash': passwordHash } });
        });
    }
}
exports.QueryUserRepo = QueryUserRepo;
//# sourceMappingURL=query-user-repo.js.map