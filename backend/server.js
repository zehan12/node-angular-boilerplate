require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

const appPath = __dirname+"/../frontend/dist/foodorder/index.html"

app.use(cors({
    credentials:true,
    origin:true
}))

app.use(express.static('../frontend/dist/foodorder'));

app.get("*",(req,res)=>{
    res.sendFile(path.join(""))
})


app.get("/api",(req,res)=>{
    res.end("hello from backend")
})


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
