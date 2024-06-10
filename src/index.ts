import {configApp} from "./config/settings";
import {runDb} from "./config/db";

const port = 3000;

export const app = configApp()
console.log("index.ts")


const startApp = async (): Promise<void> => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp();

