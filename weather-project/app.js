const express= require("express");
const app= express();
const https = require("https");
const bodyParser= require("body-parser")
const url="api.openweathermap.org/data/2.5/weather?q=";
const appid="&appid=f34cc5af67261a3596c2221502246a9b";

const rest_url= "&units=metric";

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+ "\\index.html");
});

app.post("/",function(req,res){
  const city= req.body.city;
  console.log(city);
  const urlfinal= "https:\\"+url+`${city}`+appid+ rest_url;

  https.get(urlfinal,function(response){
      console.log(response.statuscode);
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp= weatherData.main.temp;
        res.send(`<h1 styles="color: blue;">the temperature of ${city} city is ${temp} degrees celsius</h1>`);

      });
    });




});





app.listen(3000,function(){
  console.log("server is listening on port 300");
})
