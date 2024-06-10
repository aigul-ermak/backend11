"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)({});
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
//# sourceMappingURL=user-router.js.map