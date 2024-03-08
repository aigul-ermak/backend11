import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwt-sevice";
import {ObjectId} from "mongodb";
import {UserService} from "../../domain/user-service";
import {OutputUserItemType} from "../../types/user/output";


export const authBearerMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]

    const userId: ObjectId | null = await jwtService.getUserIdByToken(token)

    if (!userId) {
        res.sendStatus(401)
        return
    }

    const user: OutputUserItemType | null = await UserService.findUserById(userId)

    if (!user) {
        res.sendStatus(401)
        return
    }

    req.user = user
    next()
}