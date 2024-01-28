
// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/conf.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);


app.use(express.json());
app.use(cors());
// app.use("");

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

app.get('/collections/:collectionName', function(req, res, next) {
    // console.log("Entering in B");
    req.collection.find({}).toArray(function(err, results) {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});
app.post('/collections/:collectionName', function(req, res, next) {
  const document = req.body;
  req.collection.insertOne(document, (err, result) => {
      if (err) {
          return next(err);
      }
      res.send(result);
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
