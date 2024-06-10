import {emailAdapter} from "./email-adapter";
import {OutputUserItemType, UserType} from "../types/user/output";
import {v4 as uuid4} from "uuid";

export const emailManager = {

    async sendEmailConfirmationMessage(user: UserType) {
        const code: string = user.emailConfirmation.confirmationCode

        const message: string = `
    <h1>Thanks for your registration</h1>
    <p>To finish registration please follow the link below:
      <a href="https://somesite.com/confirm-email?code=${code}">complete registration</a>
    </p>`;
        await emailAdapter.sendEmail(user.accountData.email, "Email Confirmation", message)
    },

    //TODO check !user case
    sendEmailMessage: async function (user: OutputUserItemType | null) {

        if(!user) {
            return
        }

        const code: string = user.emailConfirmation.confirmationCode

        const message: string = `
    <h1>Thanks for your registration</h1>
    <p>To finish registration please follow the link below:
      <a href="https://somesite.com/confirm-email?code=${code}">complete registration</a>
    </p>`;

        await emailAdapter.sendEmail(user.accountData.email, "Email Confirmation", message)

    }
}