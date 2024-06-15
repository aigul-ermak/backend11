"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("../services/user-service");
const login_validator_1 = require("../validators/login-validator");
const query_user_repo_1 = require("../repositories/user-repo/query-user-repo");
const auth_bearer_middleware_1 = require("../middleware/auth/auth-bearer-middleware");
const user_validator_1 = require("../validators/user-validator");
const auth_service_1 = require("../services/auth-service");
const uuidv4_1 = require("uuidv4");
const security_service_1 = require("../services/security-service");
const cookie_middleware_1 = require("../middleware/auth/cookie_middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/registration', cookie_middleware_1.countMiddleware, (0, user_validator_1.userValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield auth_service_1.authService.createUser(req.body.login, req.body.password, req.body.email);
    if (newUser === null) {
        res.sendStatus(400);
        return;
    }
    res.status(204).send(newUser);
}));
exports.authRouter.post('/login', cookie_middleware_1.countMiddleware, (0, login_validator_1.userAuthValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.checkCredentials(req.body.loginOrEmail, req.body.password);
    const userIP = req.ip;
    const deviceId = (0, uuidv4_1.uuid)();
    const userAgent = req.headers['user-agent'] || 'Unknown Device';
    if (userAgent === 'Unknown Device') {
        return res.status(400).send('Unknown Device');
    }
    if (user) {
        const tokens = yield auth_service_1.authService
            .createAccessRefreshTokens(user, deviceId, userIP, userAgent);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true
        });
        const result = yield security_service_1.SecurityService.createSession(user.id, userIP, userAgent, deviceId, tokens);
        if (result == null)
            return res.sendStatus(401);
        return res.status(200).send({ accessToken: tokens.accessToken });
    }
    else {
        return res.sendStatus(401);
    }
}));
exports.authRouter.post('/password-recovery', cookie_middleware_1.countMiddleware, (0, user_validator_1.userEmailValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    //const result = UserService.isEmailRegistered(email);
    const result = user_service_1.UserService.passwordRecovery(email);
    if (!result)
        return res.sendStatus(400);
    return res.sendStatus(204);
}));
exports.authRouter.post('/new-password', cookie_middleware_1.countMiddleware, (0, user_validator_1.userCodeValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = user_service_1.UserService.newPassword(data);
    if (!result)
        return res.sendStatus(400);
    return res.sendStatus(204);
}));
exports.authRouter.post('/refresh-token', cookie_middleware_1.sessionRefreshTokeMiddleware, cookie_middleware_1.cookieMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldtoken = req.cookies.refreshToken;
    const tokens = yield auth_service_1.authService.refreshTokens(oldtoken);
    if (tokens) {
        const { accessToken, refreshToken } = tokens;
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        return res.status(200).send({ accessToken: accessToken });
    }
    else {
        return res.sendStatus(401);
    }
}));
exports.authRouter.post('/registration-confirmation', cookie_middleware_1.countMiddleware, (0, user_validator_1.userCodeValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    const result = yield auth_service_1.authService.confirmEmail(code);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
}));
exports.authRouter.post('/registration-email-resending', cookie_middleware_1.countMiddleware, (0, user_validator_1.userEmailValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    yield auth_service_1.authService.sendNewCodeToEmail(userEmail);
    res.sendStatus(204);
}));
exports.authRouter.get('/me', auth_bearer_middleware_1.authBearerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield query_user_repo_1.QueryUserRepo.findUserById(userId);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    res.status(200).send({
        "email": user.accountData.email,
        "login": user.accountData.login,
        "userId": user.id
    });
}));
exports.authRouter.post('/logout', cookie_middleware_1.sessionRefreshTokeMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    yield auth_service_1.authService.logoutUser(refreshToken);
    return res.sendStatus(204);
}));
//# sourceMappingURL=auth-router.js.map