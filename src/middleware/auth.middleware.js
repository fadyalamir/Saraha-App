// import jwt from "jsonwebtoken";
// import userModel from "../DB/model/User.model.js";

// export const userRoles = {
//   user: "User",
//   admin: "Admin",
// }

// // console.log(Object.values(userRoles))

// export const authentication = () => {
//   return async (req, res, next) => {
//     try {
//       const { authorization } = req.headers;
//       console.log({authorization});
//       // if (!authorization) {
//       //   return res.status(400).json({message:"authorization is required"})
//       // }
//       // console.log(authorization.split(" "));
//       const [bearer, token] = authorization?.split(" ") || []
//       console.log([bearer, token]);
      
//       if (!bearer || !token) {
//         // return res.status(400).json({message:"In-valid token components"})
//         return next(new Error("In-valid token parts", { cause: 401 }))
//       }
//       let signature = undefined;
//       switch (bearer) {
//         case 'Admin':
//           signature = process.env.TOKEN_SIGNATURE_ADMIN;
//           break;
//         case 'Bearer':
//           signature = process.env.TOKEN_SIGNATURE;
//           break;
//         default:
//           break;
//       }

//       // const decoded = jwt.verify(authorization, process.env.TOKEN_SIGNATURE);
//       const decoded = jwt.verify(token, signature);
//       console.log({decoded});
//       if(!decoded?.id) {
//         return res.status(400).json({message:"In-valid token payload"})
//       }
//       const user = await userModel.findById(decoded.id);
//       console.log({user});
//       if(!user) {
//         return res.status(404).json({message:"not register account"})
//       }
//       req.user = user;
//       return next();
//     } catch (error) {
//       if (error?.name) {
//         switch (error.name) {
//           case "TokenExpiredError":
//           case "JsonWebTokenError":
//             return res.status(400).json({message:"Token Error", error})
//           default:
//             break;
//         }
//       }
//       return res.status(500).json({message:"Server error", error})
//     }
//   }
// }

// export const authorization = (accessRoles = []) => {
//   return async (req, res, next) => {
//     try {
//       console.log({ accessRoles, user:req.user.role });

//       console.log(accessRoles.includes(req.user.role));
//       if(!accessRoles.includes(req.user.role)) {
//         return res.status(403).json({ message: "unauthorized account" })
//       }

//       return next();
//     } catch (error) {
//         return res.status(500).json({message:"Server error", error})
//     }
//   }
// }

import userModel from "../DB/model/User.model.js";
import { asyncHandler } from "../utils/error/error.js";
import { verifyToken } from "../utils/security/token.js";

export const userRoles = {
  user: "User",
  admin: "Admin",
}

export const authentication = () => {
  return asyncHandler(
    async (req, res, next) => {
      const { authorization } = req.headers;
      // console.log({authorization});
      const [bearer, token] = authorization?.split(" ") || []
      // console.log([bearer, token]);
      
      if (!bearer || !token) {
        return next(new Error("In-valid token parts", { cause: 401 }))
      }
      let signature = undefined;
      switch (bearer) {
        case 'Admin':
          signature = process.env.TOKEN_SIGNATURE_ADMIN;
          break;
        case 'Bearer':
          signature = process.env.TOKEN_SIGNATURE;
          break;
        default:
          break;
      }
      // console.log(signature);

      // const decoded = jwt.verify(token, signature);
      const decoded = verifyToken({ token, signature })
      // console.log({decoded});
      if(!decoded?.id) {
        // return res.status(400).json({message:"In-valid token payload"})
        return next(new Error("In-valid token payload", { cause: 400 }))
      }
      const user = await userModel.findById(decoded.id);
      // console.log({user});
      if(!user) {
        // return res.status(404).json({message:"not register account"})
        return next(new Error("not register account", { cause: 404 }))
      }

      // console.log({passwordTime: user.changePasswordTime.getTime(), tokenIAT: decoded.iat * 1000})
      if (user.changePasswordTime?.getTime() >= decoded.iat * 1000) {
        return next(new Error("In-valid credentials", {cause: 400}))
      }

      req.user = user;
      return next();
    }
  )
}

export const authorization = (accessRoles = []) => {
  return asyncHandler(
    async (req, res, next) => {
      console.log({ accessRoles, user:req.user.role });

      console.log(accessRoles.includes(req.user.role));
      if(!accessRoles.includes(req.user.role)) {
        // return res.status(403).json({ message: "unauthorized account" })
        return next(new Error("not register account", { cause: 403 }))
      }

      return next();
    }
  )
}