"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper1 = exports.userMapper = void 0;
const userMapper = (user) => {
    return {
        id: user._id.toString(),
        accountData: {
            login: user.accountData.login,
            email: user.accountData.email,
            passwordHash: user.accountData.passwordHash,
            passwordRecoveryCode: user.accountData.passwordRecoveryCode,
            createdAt: user.accountData.createdAt
        },
        emailConfirmation: {
            confirmationCode: user.emailConfirmation.confirmationCode,
            expirationDate: user.emailConfirmation.expirationDate,
            isConfirmed: user.emailConfirmation.isConfirmed
        }
    };
};
exports.userMapper = userMapper;
const userMapper1 = (user) => {
    return {
        // id: user._id.toString(),
        // login: user.login,
        // email: user.email,
        // passwordHash: user.passwordHash,
        // createdAt: user.createdAt
        id: user._id.toString(),
        accountData: {
            login: user.accountData.login,
            email: user.accountData.email,
            passwordHash: user.accountData.passwordHash,
            passwordRecoveryCode: user.accountData.passwordRecoveryCode,
            createdAt: user.accountData.createdAt
        },
        emailConfirmation: {
            confirmationCode: user.emailConfirmation.confirmationCode,
            expirationDate: user.emailConfirmation.expirationDate,
            isConfirmed: user.emailConfirmation.isConfirmed
        }
    };
};
exports.userMapper1 = userMapper1;
//# sourceMappingURL=mapper.js.map