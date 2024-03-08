"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    JWT_SECRET: process.env.JWT_SECRET || "123",
    ACCESS_TOKEN_EXPIRY: '20s',
    REFRESH_TOKEN_EXPIRY: '10s'
};
//# sourceMappingURL=settings.js.map