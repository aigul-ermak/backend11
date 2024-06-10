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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../../services/settings");
const cookieMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const result = jsonwebtoken_1.default.verify(token, settings_1.settings.JWT_SECRET);
        if (!result) {
            res.sendStatus(401);
            return;
        }
        next();
    }
    catch (_b) {
        res.sendStatus(401);
        return;
    }
});
exports.cookieMiddleware = cookieMiddleware;
// export const sessionRefreshTokeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     const token = req.cookies?.refreshToken;
//
//     const payload: RefreshToken | null = await jwtService.getPayloadFromToken(token);
//     console.log(payload)
//
//     if (!payload) {
//
//         res.sendStatus(401);
//         return;
//     }
//
//     const sessionExists: SessionType | null = await QuerySecurityRepo.checkRefreshTokenInList(payload.userId, payload.deviceId);
//
//     if (!sessionExists) {
//         res.sendStatus(401);
//         return;
//     }
//
//     if (sessionExists.iatDate != payload.iatDate) {
//         res.sendStatus(401);
//         return;
//     }
//
//     next();
//
// }
// export const countMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const ipUser: any = req.ip;
//     const urlUser: string = req.originalUrl; // /login/regi
//     const currentTime = new Date();
//
//
//     await SecurityRepo.insertRequestFromUser({
//         ip: ipUser,
//         url: urlUser,
//         date: currentTime,
//     });
//
//     const tenSecondsAgo = new Date(currentTime.getTime() - 10000);
//
//     const count = await SecurityRepo.countRequests(ipUser, urlUser, tenSecondsAgo);
//
//     if (count > 5) {
//         res.sendStatus(429);
//         return
//     }
//
//     next();
// };
//# sourceMappingURL=cookie_middleware.js.map