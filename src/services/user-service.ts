import {OutputUserItemType, UserType} from "../types/user/output";
import bcrypt from 'bcrypt';
import {QueryUserRepo} from "../repositories/user-repo/query-user-repo";
import {UserRepo} from "../repositories/user-repo/user-repo";
import {add} from "date-fns/add";
import {ObjectId} from "mongodb";

export class UserService {
    // static async createUser(login: string, password: string, email: string) {
    //
    //     const passwordHash = await bcrypt.hash(password, 10)
    //
    //     const newUser: UserType = {
    //         accountData: {
    //             login,
    //             email,
    //             passwordHash,
    //             createdAt: new Date().toISOString()
    //         },
    //         emailConfirmation: {
    //             confirmationCode: "",
    //             expirationDate: add(new Date(), {
    //                 hours: 1,
    //                 minutes: 3
    //             }),
    //             isConfirmed: false
    //         }
    //     }
    //
    //     const userId: string = await UserRepo.createUser(newUser)
    //     const user: OutputUserItemType| null = await QueryUserRepo.findUserById(userId)
    //
    //     if (!user) {
    //         return null
    //     }
    //     return {
    //         id: user.id,
    //         login: newUser.accountData.login,
    //         email: newUser.accountData.email,
    //         createdAt: newUser.accountData.createdAt
    //     };
    // }
    //
    // static async checkCredentials(loginOrEmail: string, password: string) {
    //
    //     const user: OutputUserItemType | null = await QueryUserRepo.findByLoginOrEmail(loginOrEmail)
    //
    //     if (!user || !user.accountData.passwordHash) {
    //         return null
    //     }
    //
    //     const isPasswordMatch = await bcrypt.compare(password, user.accountData.passwordHash);
    //     if(isPasswordMatch)
    //         return user
    //     else
    //         return null
    // }
    //
    // //TODO check type user
    // static async findUserById(userId: any) {
    //     const user : OutputUserItemType | null = await QueryUserRepo.findUserById(userId)
    //
    //     if(!user) {
    //         return null
    //     }
    //
    //     return user;
    // }
    //
    // static async deleteUser(userId: string) {
    //
    //     const userExists: OutputUserItemType| null  = await QueryUserRepo.findUserById(userId)
    //
    //     if(!userExists) {
    //         return null;
    //     }
    //
    //     await UserRepo.deleteUser(userId)
    //     return true
    //
    // }
    //
    // private static async _generateHash(password: string, salt: string) {
    //     const hash = await bcrypt.hash(password, salt)
    //     return hash
    // }
}