// server.js (CommonJS)
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
// NOTE: It's best to set NEWSAPI_KEY as an environment variable.
// Fallback uses the key you had in the repo (insecure if you commit it publicly).
const API_KEY = process.env.NEWSAPI_KEY || 'a870c52cd08d4a75bd3119d39433d18a';

app.use(express.static(path.join(__dirname)));

// Proxy endpoint
app.get('/api/proxy', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
