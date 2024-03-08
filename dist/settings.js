"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const blog_router_1 = require("./routes/blog-router");
const post_router_1 = require("./routes/post-router");
const testing_router_1 = require("./routes/testing-router");
const morgan_body_1 = __importDefault(require("morgan-body"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = require("./routes/user-router");
const auth_router_1 = require("./routes/auth-router");
const comment_router_1 = require("./routes/comment-router");
const security_router_1 = require("./routes/security-router");
const configApp = () => {
    const app = (0, express_1.default)();
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    (0, morgan_body_1.default)(app); //
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    app.use('/auth', auth_router_1.authRouter);
    app.use('/videos', videos_router_1.videosRouter);
    app.use('/blogs', blog_router_1.blogRouter);
    app.use('/posts', post_router_1.postRouter);
    app.use('/users', user_router_1.userRouter);
    app.use('/comments', comment_router_1.commentRouter);
    app.use('/security', security_router_1.securityRouter);
    app.use('/testing', testing_router_1.testingRouter);
    return app;
};
exports.configApp = configApp;
//# sourceMappingURL=settings.js.map