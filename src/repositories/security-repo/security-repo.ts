import {requestCollection, sessionCollection} from "../../db";
import {ipUrlType} from "../../types/security/output";
import {InsertOneResult} from "mongodb";


export class SecurityRepo {
    static async deleteDeviceToken(userId: string | undefined, deviceId: string) {

        const result = await sessionCollection.deleteOne({userId, deviceId});

        return result.deletedCount > 0;

    }

    static async deleteSpecifiedDeviceToken(userId: string | undefined, deviceId: string | undefined) {

        const result = await sessionCollection.deleteMany({userId: userId, deviceId: {$ne: deviceId}});
        return result.deletedCount > 0;

    }

    static async insertRequestFromUser(requestUser: ipUrlType) {

        const result: InsertOneResult = await requestCollection.insertOne(requestUser)
        return result;

    }

    static async countRequests(ip: string, url: string, fromDate: Date) {
        const count = await requestCollection.countDocuments({
            ip,
            url,
            date: { $gte: fromDate }
        });
        return count;
    }
}
