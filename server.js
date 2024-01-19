// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const {connectTODatabase, getDb} = require("./db");


// var app = express();
// const PORT = process.envPORT || 3000;

// connectTODatabase();
// app.use(bodyParser.json());
// app.use(cors());


// app.use(function(req, res){
//   console.log("Request recived");
//   res.end("Hi");

// });

// app.listen(3000, function(){
//   console.log("app started");

// });

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://BookingSystemUser:BookingUser@bookingsystem.sehxjjy.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define routes or API endpoints here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
