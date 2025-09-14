// server.js
require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/crawls', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection('crawlReports');

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.query.baseUrl) {
      filter.baseUrl = req.query.baseUrl;
    }

    const crawls = await collection
      .find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(filter);

    res.json({
      crawls,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Failed to fetch crawls:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/crawls/:id', async (req, res) => {
  try {
    const db = await connectToDb();
    const collection = db.collection('crawlReports');
    const crawl = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!crawl) {
      return res.status(404).json({ error: 'Crawl not found' });
    }

    res.json(crawl);
  } catch (error) {
    console.error('Failed to fetch crawl by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`REST API listening at http://localhost:${PORT}`);
});
