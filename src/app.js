const express=require("express")

const app=express()

app.get("/user",(req,res,next)=>{
    console.log("Handling the route")
    res.send("hello")
})
app.listen(3000,()=>{
    console.log("Server is connected successfully")
})
