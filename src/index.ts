import {configApp} from "./settings";
import {runDb} from "./db";

const port = 3000;

export const app = configApp()
console.log("index.ts")


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

