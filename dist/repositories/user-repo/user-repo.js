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
exports.UserRepo = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
class UserRepo {
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.userCollection.insertOne(user);
            return result.insertedId.toString();
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.userCollection.deleteOne({ _id: new mongodb_1.ObjectId(userId) });
            return !!result.deletedCount;
        });
    }
    static updateConfirmation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.userCollection
                .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { 'emailConfirmation.isConfirmed': true } });
            console.log(result);
            return !!result.modifiedCount;
            //return !!result.modifiedCount === 1;
        });
    }
    //static async updateCode(email: string , code: string) {
    static updateCode(id, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.userCollection
                .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { 'emailConfirmation.confirmationCode': code } });
            //.updateOne({"accountData.email": email}, {$set: {'emailConfirmation.confirmationCode': code}})
            return !!result.modifiedCount;
        });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=user-repo.js.map