// // express-app/app.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import the cors module
// const lessonRoutes = require('./routes/lessons');

// const app = express();

// // Use cors middleware
// app.use(cors());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/lessons', lessonRoutes);

// module.exports = app;


// server.js
const express = require('express');
//const { MongoClient, ObjectId } = require('mongodb');
//const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;



let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/conf.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
//URL-Encoding of User and PWD
//for potential special characters
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

//const uri = 'mongodb+srv://BookingSystemUser:BookingUser@bookingsystem.sehxjjy.mongodb.net/?retryWrites=true&w=majority';
//const uri = "mongodb+srv://BookingSystemUser:BookingUser@bookingsystem.sehxjjy.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     return;
//   }
//   console.log('Connected to MongoDB');
//   db = client.db('BookingSystem');
// });

//let dbName = 'BookingSystem';
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);

// app.use(bodyParser.json());
app.use(express.json());

app.param('collectionName', function(req, res, next, collectionName) {
    // console.log("Entering in A");
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    req.collection = db.collection(collectionName);
    return next();
});

//app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res, next) {
  // console.log("Entering in Z");
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  res.end("Hello, world!");
  //next();
});

//app.use('/images', express.static(path.join(__dirname, 'images')));


// app.get('/api/lessons', async (req, res) => {
//     try {
//       const lessons = await db.collection('Lessons').find().toArray();
//       res.json(lessons);
//       console.log(lessons);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// app.get('/Lessons', (req, res) => {
//     client.connect(err => {
//         if (err) throw err;
//         const db = client.db(dbName);
//         const collection = db.collection('Lessons');

//         collection.find({}).toArray((err, docs) => {
//             if (err) throw err;
//             res.json(docs);
//             client.close();
//         });
//     });
// });

app.get('/collections/:collectionName', function(req, res, next) {
    // console.log("Entering in B");
    req.collection.find({}).toArray(function(err, results) {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
