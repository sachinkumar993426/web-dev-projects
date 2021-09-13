

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");

const app = express();
let results=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect('mongodb+srv://admin-pk:pktk001@cluster0.w3dfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema= {
  name: String
};
const Item = mongoose.model("listItem",itemsSchema);

const Eat= new Item({name:"Eat Pasta"});
const Sleep= new Item({name:"Take a nap"});
const Eatagain= new Item({name:"Eat noodles now"});

const defaultItems=[Eat,Sleep,Eatagain];



app.get("/", function(req, res) {
  Item.find({},function(err,result){
     if(result.length===0){
      Item.insertMany(defaultItems,(err)=>{
         if(err){
           console.log(err);
         } else{
           console.log("default items added success");
           res.redirect("/");
         }
       });} else{
              res.render("list", {listTitle: "Today", newListItems: result});
            }
  });

});

const listschema= {
  name: String,
  items: [itemsSchema]
};

const List= mongoose.model("List",listschema);

app.get('/:customlistName',(req,res)=>{
  const customListName=req.params.customlistName;

  List.findOne({name:customListName},function(err,foundlists){
    if (!err) {
        if (!foundlists) {
          const newListItem= new List({
            name: customListName,
            items: defaultItems
          });
          newListItem.save();
          res.redirect("/"+customListName);
        } else {
            res.render("list", {listTitle: foundlists.name, newListItems: foundlists.items});
        }
    }
  });


})

app.post("/", function(req, res){

  const NewitemName = req.body.newItem;
  const listName= req.body.list;
  const item= new Item({
    name: NewitemName
  });

  if(listName==="Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name:listName},function(err,foundlist){
      foundlist.items.push(item);
        foundlist.save();
        res.redirect("/"+listName);
    })
  }



});

app.post("/delete",(req,res)=>{
  const checkedItemId= req.body.checkbox;
  const listName=req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemId,err=>{
      if (err) {
        console.log(err);
      } else {
        // console.log("successfully deleted the item!");
        res.redirect("/");
      }
    });
  }  else {
    List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}},{useFindAndModify:false},function(err,foundlist){
      if(!err)
      {
        res.redirect("/"+listName);
      }
    })
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
