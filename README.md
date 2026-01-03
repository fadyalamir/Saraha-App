# 📬 Saraha App - Backend API

A professional anonymous messaging platform built with **Node.js**, **Express**, and **MongoDB**. This API allows users to register, verify their emails, and receive anonymous constructive feedback.

## 🚀 Features

- **User Authentication:** Secure Signup and Login using `JWT` and `Bcrypt` for password hashing.
- **Email Verification:** Integrated with `Nodemailer` for account activation.
- **Anonymous Messaging:** Send messages to registered users without revealing identity.
- **Data Validation:** Strict input validation using `Joi`.
- **Security:** - Password encryption using `Crypto-js`.
    - CORS enabled for cross-origin requests.
    - Protected routes using custom Auth middleware.
- **Modern Tech:** Built using **ES6 Modules** (`import/export`) and **Node.js 22**.

## 🛠️ Tech Stack

- **Runtime:** Node.js (v22.15.0)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Security:** JSON Web Token (JWT), Bcrypt, Crypto-js
- **Validation:** Joi
- **Communication:** Nodemailer

## 📁 Project Structure
```text
├── src/
│   ├── modules/         # Route, Controller, and Validation for each feature
│   ├── middleware/      # Auth and Error handling
│   ├── DB/              # Database connection and Models
│   └── utils/           # Helper functions (Email, AppError, etc.)
├── index.js             # Entry point
└── .env                 # Environment variables
