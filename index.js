import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.resolve("./src/config/.env.prod")})
import bootstrap from './src/app.controller.js'
import express from 'express'
import { sendEmail } from './src/utils/email/send.email.js'
const app = express()
const port = process.env.PORT || 8000;

// let myReq = {
//   body: { name: "Fady" },
//   params: { id: 25 },
//   query: {},
//   headers: {}
// }
// console.log(myReq);
// console.log(Object.keys(myReq));



bootstrap(app, express);

// await sendEmail({to: "fadyalamer333@gmail.com", html:"<h1>Welcome Email Node.js</h1>"})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))