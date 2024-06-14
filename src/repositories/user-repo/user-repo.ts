import {OutputUserItemType, OutputUsersType, UserDBType} from "../../types/user/output";
import {ObjectId} from "mongodb";
import {UserModel} from "../../models/user";

export class UserRepo {
    //static async createUser(user: UserType) {
    static async createUser(user: UserDBType) {
        const res = await UserModel.create(user)
        return res._id.toString();
        // TODO delete
        // return result.insertedId.toString();
    }

    static async deleteUser(userId: string) {
        const result = await UserModel.deleteOne({_id: new ObjectId(userId)})
        return !!result.deletedCount;
    }

    static async updateConfirmation(id: string) {
        let result = await UserModel
            .updateOne({_id: new ObjectId(id)}, {$set: {'emailConfirmation.isConfirmed': true}})

        console.log(result);
        return !!result.modifiedCount;
        //return !!result.modifiedCount === 1;
    }

    //static async updateCode(email: string , code: string) {
    static async updateCode(id: string | undefined, code: string) {
        let result = await UserModel
            .updateOne({_id: new ObjectId(id)}, {$set: {'emailConfirmation.confirmationCode': code}})
            //.updateOne({"accountData.email": email}, {$set: {'emailConfirmation.confirmationCode': code}})

        return !!result.modifiedCount;

    }
}
