import {UserService} from "../services/user-service";
import {RequestWithBody} from "../types/common";
import {CreateUserData} from "../types/user/input";
import {Request, Response} from "express";
import {OutputUserItemType} from "../types/user/output";
import {AuthService} from "../services/auth-service";
import {RefreshedToken} from "../types/token/output";
import {uuid} from "uuidv4";

export class AuthController {
    constructor(protected authService: AuthService) {
    }

    async createUser(req: Request, res: Response) {

        const newUser = await this.authService.createUser(req.body.login, req.body.password, req.body.email)

        if (newUser === null) {
            res.sendStatus(400)
            return
        }
        res.status(204).send(newUser)
    }

    async loginUser(req: Request, res: Response) {
        //TODO service??
        const user: OutputUserItemType | null = await UserService.checkCredentials(req.body.loginOrEmail, req.body.password)

        const userIP: string = req.ip!;
        const deviceId: string = uuid();

        const userAgent: string = req.headers['user-agent'] || 'Unknown Device';
        if (userAgent === 'Unknown Device') {
            return res.status(400).send('Unknown Device');
        }

        if (user) {
            const tokens: RefreshedToken = await this.authService
                .createAccessRefreshTokens(user, deviceId, userIP, userAgent)


            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true
            })
//TODO another service
            const result = await SecurityService.createSession(user.id, userIP, userAgent, deviceId, tokens);

            if (result == null)
                return res.sendStatus(401)

            return res.status(200).send({accessToken: tokens.accessToken})
        } else {
            return res.sendStatus(401)
        }
    }

    async passwordRecovery(req: Request, res: Response) {
        const email = req.body.email;
// TODO user service??
        const result = UserService.passwordRecovery(email);

        // if (!result)
        //     return res.sendStatus(400)

        return res.sendStatus(204);
    }

    async newPassword(req: Request, res: Response) {
        const {newPassword, recoveryCode} = req.body;
// userService?
        const result: boolean = await UserService.newPassword(newPassword, recoveryCode);

        if (!result)
            return res.sendStatus(400)

        return res.sendStatus(204);

    }

    async refreshTokens(req: Request, res: Response) {
        const oldtoken: any = req.cookies.refreshToken

        const tokens: RefreshedToken | null = await this.authService.refreshTokens(oldtoken);

        if (tokens) {

            const {accessToken, refreshToken} = tokens;

            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true});
            return res.status(200).send({accessToken: accessToken});

        } else {
            return res.sendStatus(401);
        }

    }

    async confirmEmail(req: Request, res: Response) {
        const code = req.body.code

        const result: boolean = await this.authService.confirmEmail(code);

        if (!result) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(204)
    }

    async sendNewCodeToEmail(req: Request, res: Response) {
        const userEmail = req.body.email

        await this.authService.sendNewCodeToEmail(userEmail);

        res.sendStatus(204);
    }

    async findUserById(req: Request, res: Response) {

        const userId = req.user!.id
        //  another service
        const user: OutputUserItemType | null = await this.QueryUserRepo.findUserById(userId)

        if (!user) {
            res.sendStatus(401)
            return
        }

        res.status(200).send({
            "email": user.accountData.email,
            "login": user.accountData.login,
            "userId": user.id
        })

    }

    async logoutUser(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;
        await this.authService.logoutUser(refreshToken);
        return res.sendStatus(204);
    }
}