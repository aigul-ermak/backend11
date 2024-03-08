import {userCollection} from "../../db";
import {OutputUserItemType, OutputUsersType, UserType} from "../../types/user/output";
import {ObjectId} from "mongodb";

export class UserRepo {
    static async createUser(user: UserType) {
        const result = await userCollection.insertOne(user)
        return result.insertedId.toString();
    }

    static async deleteUser(userId: string) {
        const result = await userCollection.deleteOne({_id: new ObjectId(userId)})
        return !!result.deletedCount;
    }

    static async updateConfirmation(id: string) {
        let result = await userCollection
            .updateOne({_id: new ObjectId(id)}, {$set: {'emailConfirmation.isConfirmed': true}})

        console.log(result);
        return !!result.modifiedCount;
        //return !!result.modifiedCount === 1;
    }

    //static async updateCode(email: string , code: string) {
    static async updateCode(id: string | undefined, code: string) {
        let result = await userCollection
            .updateOne({_id: new ObjectId(id)}, {$set: {'emailConfirmation.confirmationCode': code}})
            //.updateOne({"accountData.email": email}, {$set: {'emailConfirmation.confirmationCode': code}})

        return !!result.modifiedCount;

    }
}
