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
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2); 
    var w =Number(req.body.weight);
    var H =Number(req.body.height);
    var BMI =w+H;
    var result = num1 +num2;
    console.log(BMI)
    res.send("the result of BMI is "+BMI,result );  
    // res.send("the result of calculation is "+result );  

});
app.listen(3000,()=>{
    console.log("server started listening on port 3000");
})

  