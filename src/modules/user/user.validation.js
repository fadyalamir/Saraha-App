import joi from 'joi'
import { generalFields } from '../../middleware/validation.middleware.js'
import { Types } from 'mongoose'

export const shareProfile = joi.object().keys({
  // userId: joi.string().custom(validateObjectId).required()
  userId: generalFields.id.required()
}).required()

export const updateProfile = joi.object().keys({
  username: generalFields.username,
  phone: generalFields.phone,
  DOB: joi.date().less("now")
}).required()

export const updatePassword = joi.object().keys({
  oldPassword: generalFields.password.required(),
  password: generalFields.password.not(joi.ref("oldPassword")).required(),
  confirmationPassword: generalFields.confirmationPassword.valid(joi.ref("password")).required()
}).required()