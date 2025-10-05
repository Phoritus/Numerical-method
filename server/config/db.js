const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI || (config.has('mongoURI') ? config.get('mongoURI') : '');
    if (!db || /----/.test(db)) {
      console.warn("MongoDB URI missing or placeholder detected. Skipping DB connection.");
      return;
    }
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};
module.exports = connectDB;
