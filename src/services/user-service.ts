import {OutputUserItemType, UserDBType} from "../types/user/output";
import bcrypt from 'bcrypt';
import {QueryUserRepo} from "../repositories/user-repo/query-user-repo";
import {UserRepo} from "../repositories/user-repo/user-repo";
import {add} from "date-fns/add";
import {ObjectId} from "mongodb";
import {UserModel} from "../models/user";
import {QuerySecurityRepo} from "../repositories/security-repo/query-security-repo";
import {uuid} from "uuidv4";
import {emailManager} from "./email-manager";

export class UserService {
    static async createUser(login: string, password: string, email: string) {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser: UserDBType = {
            accountData: {
                login,
                email,
                passwordHash,
                passwordRecoveryCode: "",
                recoveryCodeExpirationDate: null,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: "",
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }

        const userId: string = await UserRepo.createUser(newUser)
        const user: OutputUserItemType | null = await QueryUserRepo.findUserById(userId)

        if (!user) {
            return null
        }
        return {
            id: user.id,
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        };
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

    //TODO check type user
    static async findUserById(userId: any) {
        const user: OutputUserItemType | null = await QueryUserRepo.findUserById(userId)

        if (!user) {
            return null
        }

        return user;
    }

    static async deleteUser(userId: string) {

        const userExists: OutputUserItemType | null = await QueryUserRepo.findUserById(userId)

        if (!userExists) {
            return null;
        }

        await UserRepo.deleteUser(userId)
        return true

    }

    static async passwordRecovery(email: string): Promise<boolean> {

        const user = await QueryUserRepo.findUserByEmail(email);

        if (user) {
            const passwordRecoveryCode: string = uuid();

            await UserRepo.updateUser(user.id, passwordRecoveryCode);
            await emailManager.sendRecoveryCodeMessage(user.accountData.email, user.accountData.passwordRecoveryCode);
            return true;
        }

        return false;

    }

//TODO type??
    static async newPassword(newPassword: string, recoveryCode: string) {
        //TODO type??
        const user: any = await QueryUserRepo.findUserByRecoveryCode(recoveryCode);

        if (user) {
            {
                const hashedPassword: string = await bcrypt.hash(newPassword, 10);
                await QueryUserRepo.updatePassword(user.id, hashedPassword);
                return true;
            }
        }
        return false;

    }

    private static async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}