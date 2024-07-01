import {UserRepo} from "./repositories/user-repo/user-repo";
import {UserService} from "./services/user-service";
import {UserController} from "./controllers/userController";
import {AuthService} from "./services/auth-service";
import {AuthController} from "./controllers/authController";
import {CommentService} from "./services/comment-service";
import {CommentRepo} from "./repositories/comment-repo/comment-repo";
import {CommentController} from "./controllers/commentController";

const userRepo = new UserRepo();
const commentRepo = new CommentRepo();

const userService = new UserService(userRepo);
const authService = new AuthService(userRepo);
const commentService = new CommentService(commentRepo);


export const userController = new UserController(userService);
export const authController = new AuthController(authService, userService);
export const commentController = new CommentController(commentService);

