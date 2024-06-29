import {Response} from "express";
import {UserService} from "../services/user-service";
import {RequestWithBody} from "../types/common";
import {CreateUserData} from "../types/user/input";
import {OutputUserItemType} from "../types/user/output";


export class UserController {
    constructor(protected userService: UserService) {
    }

    async createUser(req: RequestWithBody<CreateUserData>, res: Response<OutputUserItemType>) {
        const newUser: any = await this.userService.createUser(req.body.login, req.body.password, req.body.email)
        if (newUser) {
            res.status(201).send(newUser)
        } else {
            res.sendStatus(401)
        }
    }
}
