// import mongoose from "mongoose";

// const connectDB = async () => {
//   await mongoose.connect(process.env.DB_URI).then(res => {
//     console.log(`DB connected`);
//   }).catch (err => {
//     console.error(`Fail to connect on DB`, err);
//   })
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    
    console.log(`DB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Fail to connect on DB:`, err.message);
    throw err; 
  }
};

export default connectDB;