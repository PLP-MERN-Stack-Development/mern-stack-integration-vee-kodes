const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas:', conn.connection.name);
    return conn; // return the connection
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
