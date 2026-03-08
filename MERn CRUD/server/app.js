const express = require('express');
const cors = require('cors');
const app=express();
const userRoutes=require('./routes/userRoutes');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/v2/users',userRoutes);

module.exports=app;