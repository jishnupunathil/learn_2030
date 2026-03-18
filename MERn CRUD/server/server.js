const PORT=process.env.PORT || 5001;

const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app');

dotenv.config();

//mongodb connection

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.mongdbUrl.replace("<dbPwd>", process.env.dbPwd)
    );

    console.log("✅ DB connection successful");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // stop app if DB fails
  }
};

startServer();