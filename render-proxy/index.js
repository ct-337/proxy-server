const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Render-Proxy'
      },
      responseType: 'text'
    });

    res.set('Content-Type', response.headers['content-type'] || 'text/plain');
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch target URL', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
