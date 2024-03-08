import {settings} from "./settings";
import jwt from 'jsonwebtoken';
import {RefreshToken} from "../types/token/output";


export const jwtService = {

    async getUserIdByToken(token: string) {
        try {
            // TODO type?
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            const userId = result.userId;
            return userId;
        } catch (error) {
            return null
        }
    },


    async createAccessToken(userId: string) {
        return jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: settings.ACCESS_TOKEN_EXPIRY});
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
    async createRefreshToken(id: string, deviceId: string) {
        const refreshToken: string = jwt.sign(
            {
                id: id,
                deviceId: deviceId
            },
            settings.JWT_SECRET,
            {expiresIn: settings.REFRESH_TOKEN_EXPIRY})
        return refreshToken.toString()
    },

    async verify(token: string) {

    },

    getPayloadFromToken(token: string): RefreshToken | null {
        try {
            const decodedToken = jwt.decode(token);
            const userId = (decodedToken as any).id
            const deviceId = (decodedToken as any).deviceId
            const iatDate: string = (new Date((decodedToken as any).iat * 1000)).toISOString();
            const expDate: string = (new Date((decodedToken as any).exp * 1000)).toISOString();
            return {userId, deviceId, iatDate, expDate}
        } catch (e) {
            return null
        }
    },
}




