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
  
const PORT=process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})