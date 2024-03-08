"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRateLimitMiddleware = void 0;
const rateLimit = require('express-rate-limit');
exports.loginRateLimitMiddleware = rateLimit({
    windowMs: 100 * 1000,
    max: 5,
    handler: (req, res, next) => {
        return res.sendStatus(429);
    }
});
//# sourceMappingURL=rateLimitMiddleware.js.map