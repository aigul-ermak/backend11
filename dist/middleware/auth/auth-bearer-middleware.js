"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const authBearerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     if (!req.headers.authorization) {
//         res.send(401)
//         return
//     }
//
//     const token = req.headers.authorization.split(' ')[1]
//
//     const userId: ObjectId | null = await jwtService.getUserIdByToken(token)
//
//     if (!userId) {
//         res.sendStatus(401)
//         return
//     }
//
//     const user: OutputUserItemType | null = await UserService.findUserById(userId)
//
//     if (!user) {
//         res.sendStatus(401)
//         return
//     }
//
//     req.user = user
//     next()
// }
//# sourceMappingURL=auth-bearer-middleware.js.map