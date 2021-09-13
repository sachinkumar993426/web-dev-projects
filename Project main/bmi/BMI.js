const express = require("express");
const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
    // console.log(__dirname + "/index.html");
});
app.post("/",(req,res)=>{
    
    // res.send(req.body); 
    console.log(__dirname + "/index.html");
    
    var w =Number(req.body.weight);
    var H =Number(req.body.height);
    var BMI =w/(H*H);

    console.log(BMI)
    res.send("the result of BMI is "+BMI );  
     

});
app.listen(3000,()=>{
    console.log("server started listening on port 3000");
})

  