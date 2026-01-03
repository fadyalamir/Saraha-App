import userModel from "../../../DB/model/User.model.js";
import { emailEvent } from "../../../utils/events/email.event.js";
// import { sendEmail } from "../../../utils/email/send.email.js";
// import { confirmEmailTemplate } from "../../../utils/email/template/confirmEmail.js";
// import asyncHandler from "express-async-handler";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import { verifyToken } from "../../../utils/security/token.js";

export const signup = asyncHandler(
  async (req, res, next) => {
    const {username, email, password, phone} = req.body;
    // console.log({username, email, password, confirmationPassword});
    // username = 5;

    // const validationResult = signupValidationSchema.validate({ username, email, password, confirmationPassword }, { abortEarly: false })

    // if (password !== confirmationPassword) {
    //   // return res.status(400).json({message:"password mismatch confirmationPassword"})
    //   return next(new Error("password !== cPassword", { cause: 400 }))
    // }
    // const checkUser = await userModel.findOne({email}) // { } null
    if (await userModel.findOne({email})) {
      // return res.status(409).json({message:"Email exist"})
      return next(new Error("Email exist", { cause: 409 }))
    }
    // const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT))
    const hashPassword = generateHash({ plaintext: password, salt: 10 })
    // const encryptPhone = CryptoJS.AES.encrypt(phone, process.env.PHONE_ENC).toString()
    const encryptPhone = generateEncryption({ plaintext: phone })
    const user = await userModel.create({username, email, password: hashPassword, phone: encryptPhone})

    // const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN_SIGNATURE)
    // const emailLink = `${process.env.FE_URL}/confirm-email/${emailToken}`
    // // const html = `<a href="${emailLink}">Click me</a>`
    // const html = confirmEmailTemplate({ link:emailLink })
    // await sendEmail({ to:email, subject:"Confirm Email", html })
    emailEvent.emit("sendConfirmEmail", { email })

    // return res.status(201).json({message: "Done", user})
    return successResponse({ res, message: "Done", data: { user }, status: 201})
  }
)

export const confirmEmail = asyncHandler(
  async (req, res, next) => {
    const {authorization} = req.headers;
    const decoded = verifyToken({ token: authorization, signature: process.env.EMAIL_TOKEN_SIGNATURE })
    const user = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true }, { new: true })
    // return res.status(201).json({message: "Done", user})
    return successResponse({ res, message: "Done", data: {user} })
  }
)