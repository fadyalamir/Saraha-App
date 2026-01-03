import joi from 'joi'
import { Types } from 'mongoose';

export const validateObjectId = (value, helper) => {
  console.log({value, helper});
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid objectId");
};

export const generalFields = {
  username: joi.string().alphanum().case('upper').min(2).max(20).messages({
    'string.min' : "min is 2",
    'string.empty': "username cannot be empty",
    'any.required': "username is required"
  }),
  email: joi.string().email({minDomainSegments: 2, maxDomainSegments: 3, tlds:{allow:['com', 'net', 'edu', 'eg']}}),
  password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
  confirmationPassword: joi.string().valid(joi.ref("password")),
  phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
  id: joi.string().custom(validateObjectId),
  'accept-language': joi.string().valid("en", "ar"),
}

export const validation = (schema) => {
  return (req, res, next) => {
    const inputData = {...req.body, ...req.query, ...req.params}
    console.log({inputData});
    if (req.headers['accept-language']) {
      inputData['accept-language'] = req.headers['accept-language']
    }
    // console.log(inputData);
    
    const validationResult = schema.validate(inputData, { abortEarly: false })
    if (validationResult.error) {
      return res.status(400).json({ message: "Validation Error", validationResult: validationResult.error.details })
    }
    return next()
  }
}

export const validation_Custom = (schema) => {
  return(req, res, next) => {
    console.log(schema);
    console.log(Object.keys(schema)); // [body, params]
    const validationErrors = [];

    for (const key of Object.keys(schema)) {
      console.log(key);
      const validationResult = schema[key].validate(req[key], { abortEarly: false })
      if (validationResult.error) {
        validationErrors.push({ key, error: validationResult.error.details })
        // return res.status(400).json({ message: "Validation Error", validationResult: validationResult.error.details })
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({ message: "Validation Error", validationResult: validationErrors })
    }
    return next();

    // const validationResultParams = paramsSchema.validate(req.params, { abortEarly: false })
    // if (validationResultParams.error) {
    //   return res.status(400).json({ message: "Validation Error", validationResultParams: validationResultParams.error.details })
    // }
    // return next()
  }
}