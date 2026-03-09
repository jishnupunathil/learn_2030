const PORT=process.env.PORT || 5001;

const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app');

dotenv.config();

//mongodb connection

mongoose.connect(process.env.mongdbUrl.replace("<dbPwd>",process.env.dbPwd))
.then(()=>{
    console.log("DB connection successful");
})
.catch((err)=>{
    console.log("DB connection failed");
})
  


app.use((err, req, res, next) => {

  console.error(err); // shows error in terminal

  res.status(res.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });

});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})