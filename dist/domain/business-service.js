"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessService = void 0;
exports.businessService = {
    doOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            //save to repo
            //get user from repo
            //await emailAdapter.sendEmail("user.email", "password recovery", "<div>message</div>")
            // await emailManager.sendPasswordRecoveryMessage({})
        });
    }
};
//     <h1>Thank for your registration</h1>
// <p>To finish registration please follow the link below:
//     <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>
// </p>
//# sourceMappingURL=business-service.js.map