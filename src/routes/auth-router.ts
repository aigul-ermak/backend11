import {Router, Request, Response} from "express";
import {UserService} from "../services/user-service";
import {userAuthValidation} from "../validators/login-validator";
import {QueryUserRepo} from "../repositories/user-repo/query-user-repo";
import {OutputUserItemType} from "../types/user/output";
import {authBearerMiddleware} from "../middleware/auth/auth-bearer-middleware";
import {
    recoveryCodeValidation,
    userCodeValidation,
    userEmailValidation,
    userValidation
} from "../validators/user-validator";
import {authService} from "../services/auth-service";
import {RefreshedToken} from "../types/token/output";
import {uuid} from "uuidv4";
import {SecurityService} from "../services/security-service";
import {cookieMiddleware, countMiddleware, sessionRefreshTokeMiddleware} from "../middleware/auth/cookie_middleware";

export const authRouter: Router = Router({})

authRouter.post('/registration', countMiddleware, userValidation(), async (req: Request, res: Response) => {

    const newUser = await authService.createUser(req.body.login, req.body.password, req.body.email)

    if (newUser === null) {
        res.sendStatus(400)
        return
    }

    res.status(204).send(newUser)

})

authRouter.post('/login', countMiddleware, userAuthValidation(), async (req: Request, res: Response) => {
    const user: OutputUserItemType | null = await UserService.checkCredentials(req.body.loginOrEmail, req.body.password)

    const userIP: string = req.ip!;
    const deviceId: string = uuid();

    const userAgent: string = req.headers['user-agent'] || 'Unknown Device';
    if (userAgent === 'Unknown Device') {
        return res.status(400).send('Unknown Device');
    }

    if (user) {
        const tokens: RefreshedToken = await authService
            .createAccessRefreshTokens(user, deviceId, userIP, userAgent)


        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true
        })

        const result = await SecurityService.createSession(user.id, userIP, userAgent, deviceId, tokens);

        if (result == null)
            return res.sendStatus(401)

        return res.status(200).send({accessToken: tokens.accessToken})
    } else {
        return res.sendStatus(401)
    }
})

authRouter.post('/password-recovery', countMiddleware, userEmailValidation(), async (req: Request, res: Response) => {

    const email = req.body.email;

    //const result = UserService.isEmailRegistered(email);
    const result = UserService.passwordRecovery(email);

    if (!result)
        return res.sendStatus(400)

    return res.sendStatus(204);

})

authRouter.post('/new-password',
    countMiddleware,
    recoveryCodeValidation(),
    async (req: Request, res: Response) => {

    const data = req.body;

    const result = UserService.newPassword(data.newPassword, data.recoveryCode);

    if (!result)
        return res.sendStatus(400)

    return res.sendStatus(204);

})

authRouter.post('/refresh-token', sessionRefreshTokeMiddleware, cookieMiddleware,
    async (req: Request, res: Response) => {
        const oldtoken: any = req.cookies.refreshToken

        const tokens: RefreshedToken | null = await authService.refreshTokens(oldtoken);

        if (tokens) {

            const {accessToken, refreshToken} = tokens;

            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true});
            return res.status(200).send({accessToken: accessToken});

        } else {
            return res.sendStatus(401);
        }

    })

authRouter.post('/registration-confirmation', countMiddleware, userCodeValidation(), async (req: Request, res: Response) => {
    const code = req.body.code

    const result: boolean = await authService.confirmEmail(code);

    if (!result) {
        res.sendStatus(400)
        return
    }
    res.sendStatus(204)
})

authRouter.post('/registration-email-resending',
    countMiddleware, userEmailValidation(), async (req: Request, res: Response) => {
        const userEmail = req.body.email

        await authService.sendNewCodeToEmail(userEmail);

        res.sendStatus(204);
    })

authRouter.get('/me', authBearerMiddleware, async (req: Request, res: Response) => {

    const userId = req.user!.id
    const user: OutputUserItemType | null = await QueryUserRepo.findUserById(userId)

    if (!user) {
        res.sendStatus(401)
        return
    }

    res.status(200).send({
        "email": user.accountData.email,
        "login": user.accountData.login,
        "userId": user.id
    })
})

authRouter.post('/logout', sessionRefreshTokeMiddleware, async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    await authService.logoutUser(refreshToken);
    return res.sendStatus(204);
})

