const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://BookingSystemUser:BookingUser@bookingsystem.sehxjjy.mongodb.net/';

let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('BookingSystem');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDb,
};