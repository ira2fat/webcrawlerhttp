require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let db = null;

async function connectToDb() {
  if (db) return db;

  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

module.exports = { connectToDb };