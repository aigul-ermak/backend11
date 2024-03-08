import {SessionType} from "../../types/token/output";
import {sessionCollection} from "../../db";


export class QuerySecurityRepo {
    static async putSessionToList(session: SessionType) {
        const result = await sessionCollection.insertOne(session);
        return result;
    }

    static async updateSessionToList(userId: string, deviceId: string, iatDate: string, expDate: string) {
        const filter = { userId: userId, deviceId: deviceId };
        const updateDoc = {
            $set: {
                iatDate: iatDate,
                expDate: expDate
            }
        };
        const result = await sessionCollection.updateOne(filter, updateDoc);
        return result;
    }

    static async deleteSessionFromList(id: string | undefined, deviceId: string | undefined) {
        const userId: string |undefined = await id;
        const result = await sessionCollection.deleteOne({userId, deviceId});

        return result.deletedCount > 0;
    }

    static async checkTokenInList(refreshToken: string) {
        const token = await sessionCollection.findOne({refreshToken})
        return token;
    }

    static async checkRefreshTokenInList(id: string, deviceId: string) {
        const token: SessionType | null = await sessionCollection.findOne({userId: id, deviceId:deviceId})
        return token;
    }

    static async findSessionByDeviceId(deviceId: string) {
        const session: SessionType | null  = await sessionCollection.findOne({deviceId})
        return session;
    }


}
