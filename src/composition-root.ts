import {UserRepo} from "./repositories/user-repo/user-repo";
import {UserService} from "./services/user-service";
import {UserController} from "./controllers/userController";
import {AuthService} from "./services/auth-service";
import {AuthController} from "./controllers/authController";

const userRepo = new UserRepo();
export const userService = new UserService(userRepo);
const authService = new AuthService(userRepo);
export const userController = new UserController(userService);
export const authController = new AuthController(authService);