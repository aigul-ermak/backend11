import {Router, Response} from "express";
import {RequestTypeWithQuery, RequestWithBody, RequestWithParams} from "../types/common";
import {authMiddleware} from "../middleware/auth/auth-middleware";
import {QueryUserRepo} from "../repositories/user-repo/query-user-repo";
import {UserService} from "../services/user-service";
// import {userValidation} from "../validators/user-validator";
import {OutputUserItemType, OutputUsersType, SortUserType} from "../types/user/output";
import {CreateUserData} from "../types/user/input";

export const userRouter: Router = Router({})

// userRouter.get('/',
//     async (req: RequestTypeWithQuery<SortUserType>, res: Response<OutputUsersType>) => {
//
//     const sortData = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize,
//         searchLoginTerm: req.query.searchLoginTerm,
//         searchEmailTerm: req.query.searchEmailTerm
//     }
//
//     const users: OutputUsersType = await QueryUserRepo.getAllUsers(sortData)
//
//     res.status(200).send(users)
// })

// userRouter.post('/', authMiddleware,
//     userValidation(),
//     //usersExistsValidation(),
//     async (req: RequestWithBody<CreateUserData>, res: Response<OutputUserItemType>) => {
//     const newUser: any | null = await UserService.createUser(req.body.login, req.body.password, req.body.email)
//     if (newUser) {
//         res.status(201).send(newUser)
//     } else {
//         res.sendStatus(401)
//     }
// })
//
// userRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<{id: string}>, res: Response) => {
//     const userId : string = req.params.id;
//     const result = await UserService.deleteUser(userId)
//
//     if(!result) {
//         res.sendStatus(404)
//         return
//     }
//     res.sendStatus(204)
// })
