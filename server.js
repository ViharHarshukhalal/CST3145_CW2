
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
  // res.end("Hello, world!");
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
app.put('/collections/:collectionName/:id', function(req, res, next) {
  const lessonId = req.params.id;
  const updatedSpaces = req.body.spaces;

//   Convert lessonId to MongoDB ObjectId if necessary
  const query = { _id: id.length === 24 ? new ObjectId(id) : id };
//   let objectId;
//   try {
//       objectId = new ObjectId(lessonId);
//   } catch (e) {
//       return res.status(500).send({ error: 'Invalid lesson ID' });
//   }
//   const query = { _id: objectId };


  req.collection.updateOne(query, { $set: { spaces: updatedSpaces } }, function(err, result){
      if (err) {
          return next(err);
      }
      res.send(result);
  });
});

app.get('/search', function(req, res, next) {
  const searchQuery = req.query.q; // Get search query from URL query parameter

  if (!searchQuery) {
      return res.status(400).send({ error: 'Search query is required' });
  }

  const lessonsCollection = db.collection('lessons');

  lessonsCollection.find({ $text: { $search: searchQuery } }).toArray(function(err, results) {
      if (err) {
          return next(err);
      }
      console.log('Search results:', results);
      res.send(results);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// hiie is this test
