import {OutputUserItemType, UserDBType} from "../types/user/output";
import bcrypt from 'bcrypt';
import {QueryUserRepo} from "../repositories/user-repo/query-user-repo";
import {UserRepo} from "../repositories/user-repo/user-repo";
import {emailManager} from "./email-manager";
import {v4 as uuid4} from 'uuid';
import {add} from "date-fns/add";
import jwt from "jsonwebtoken";
import {settings} from "./settings";
import {UserService} from "./user-service";
import {jwtService} from "./jwt-sevice";
import {RefreshToken} from "../types/token/output";

import {QuerySecurityRepo} from "../repositories/security-repo/query-security-repo";


export class authService {
    static async createUser(login: string, password: string, email: string) {

        const existsUser: OutputUserItemType | null = await QueryUserRepo.findByLoginOrEmail(email);

        if (existsUser !== null) {
            return null;
        }

        const passwordHash: string = await bcrypt.hash(password, 10)

        const newUser: UserDBType = {
            accountData: {
                login: login,
                email: email,
                passwordHash,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuid4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }

        const result: string = await UserRepo.createUser(newUser)
        // HW 7
        await emailManager.sendEmailConfirmationMessage(newUser)
        return result;

    }

    static async createAccessRefreshTokens(user: OutputUserItemType, deviceId: string,
                                           userIP: string, userAgent: string) {
        const accessToken: string = await jwtService.createAccessToken(user.id)

        const refreshToken: string = await jwtService.createRefreshToken(
            user.id, deviceId);

        return {accessToken, refreshToken}

    }

    static async refreshTokens(token: string) {

        const payload: RefreshToken | null = jwtService.getPayloadFromToken(token)

        if (!payload)
            return null

        const accessToken: string = await jwtService.createAccessToken(payload.userId)
        const refreshToken = await jwtService.createRefreshToken(payload.userId, payload.deviceId);

        if (!refreshToken) return null;

        const newPayload =  jwtService.getPayloadFromToken(refreshToken)

        if(!newPayload) return null

        const iatDate : string  = newPayload.iatDate
        const expDate: string = newPayload.expDate

        let result = await QuerySecurityRepo.updateSessionToList(
            payload.userId, payload.deviceId, iatDate, expDate)

        return ({accessToken, refreshToken});
    }


    static async checkCredentials(loginOrEmail: string, password: string) {

        const user: OutputUserItemType | null = await QueryUserRepo.findByLoginOrEmail(loginOrEmail)

        if (!user || !user.accountData.passwordHash) {
            return null
        }

        const isPasswordMatch = await bcrypt.compare(password, user.accountData.passwordHash);
        if (isPasswordMatch)
            return user
        else
            return null
    }

    static async findUserById(userId: string) {
        const user = await QueryUserRepo.findUserById(userId)

        if (!user) {
            return null
        }

        return user;
    }

    static async deleteUser(userId: string) {

        const userExists = await QueryUserRepo.findUserById(userId)


        if (!userExists) {
            return null;
        }

        await UserRepo.deleteUser(userId)
        return true

    }

    static async checkAndFindUserByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            //const user :OutputUserItemType | null  = await UserService.findUserById(new ObjectId(result.userId))
            const user: OutputUserItemType | null = await UserService.findUserById(result.userId)
            return user
        } catch (e) {
            return null
        }
    }

    static async confirmEmail(code: string): Promise<boolean> {

        const user: OutputUserItemType | null = await QueryUserRepo.findUserByConfirmationCode(code)

        if (!user) return false

        if (user.emailConfirmation.confirmationCode === code) {
            let result: boolean = await UserRepo.updateConfirmation(user.id)
            return result
        }
        return false
    }

    static async sendNewCodeToEmail(email: string): Promise<boolean> {
        const newCode: string = uuid4();

        let user: OutputUserItemType | null = await QueryUserRepo.findByLoginOrEmail(email)

        await UserRepo.updateCode(user?.id, newCode)

        let userWithNewCode: OutputUserItemType | null = await QueryUserRepo.findByLoginOrEmail(email)

        await emailManager.sendEmailMessage(userWithNewCode);

        return true
    }

    static async logoutUser(refreshToken: string) {
        const payload: RefreshToken|null = await jwtService.getPayloadFromToken(refreshToken)

        if(!payload)
            return null

        const userId: string = payload?.userId
        const deviceId: string = payload?.deviceId

        const result = await QuerySecurityRepo.deleteSessionFromList(userId, deviceId);

        if(!result)
            return null

        return true

    }
}