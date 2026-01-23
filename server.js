const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const setupConfig = require('./db');
const createRoutes = require('./routes');

dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:5173', 'https://metrimoniyal.netlify.app'], credentials: true }));
app.use(express.json());

async function run() {
  try {
    const collections = await setupConfig();
    
    app.use('/', createRoutes(collections, stripe));

    app.get('/', (req, res) => res.send('Love Matrimony server is running...'));
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error('Start error:', error);
  }
}

run();