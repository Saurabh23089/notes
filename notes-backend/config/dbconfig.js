const mongoose = require('mongoose');
const myconstant = require("./constant")
const process = require("process")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(myconstant.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;