const express = require("express");
const mongoose = require("mongoose");
const {connectDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./model/url");
const app = express();
const PORT=8000;
app.use(express.json())
connectDB('mongodb://127.0.0.1:27017/shorturl').then(()=>console.log("database connected"));
app.use('/url',urlRoute);
app.get('/:shortid',async (req,res)=>{
    const shortId = req.params.shortid;
    const uentry= await URL.findOneAndUpdate({shortId},{$push:{visitHistory: {timestamp:Date.now()}}});
    res.redirect(uentry.redirectUrl);
})

app.listen(PORT,()=>console.log(`server started at port: ${PORT}`));