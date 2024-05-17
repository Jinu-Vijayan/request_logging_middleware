const express = require("express");
const fs = require("fs");

const PORT = 4000;

function loggerMiddleware(req,res,next){
    fs.appendFileSync("requestlog.log",`Request received in ${req.url} with ${req.method} method from ${req.ip} at ${new Date} \n`);
    next();
}

const app =  express();

app.use(loggerMiddleware);

app.get("/products",(req,res)=>{
    res.status(200).json({
        message: "Dummy product json data"
    })
})


app.use("/*",(req,res)=>{
    res.status(400).json({
        error: "Path not found"
    })
});

app.listen(PORT, ()=>{
    console.log("Server up and running at port -", PORT);
})