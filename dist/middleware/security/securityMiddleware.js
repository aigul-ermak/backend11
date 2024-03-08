"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddleware = void 0;
const securityMiddleware = (req, res, next) => {
    // First option
    // if (req.headers['authorization'] !== 'Basic YWRtaW46cXdlcnR5') {
    //     res.sendStatus(401)
    // }
    //
    // return next()
    //or
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    const [basic, token] = auth.split(" ");
    if (basic !== "Basic") {
        res.sendStatus(401);
        return;
    }
    // const decodedData = Buffer.from(token, 'base64').toString();
    //
    // const [decodedLogin, decodedPassword] = decodedData.split(":")
    //
    // if (decodedLogin !== login || decodedPassword !== password) {
    //     res.sendStatus(401)
    //     return
    // }
    // return next()
};
exports.securityMiddleware = securityMiddleware;
//# sourceMappingURL=securityMiddleware.js.map