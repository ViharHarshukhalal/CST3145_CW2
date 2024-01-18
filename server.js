const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {connectTODatabase, getDb} = require("./db");


var app = express();
const PORT = process.envPORT || 3000;

connectTODatabase();
app.use(bodyParser.json());
app.use(cors());


app.use(function(req, res){
  console.log("Request recived");
  res.end("Hi");

});

app.listen(3000, function(){
  console.log("app started");

});