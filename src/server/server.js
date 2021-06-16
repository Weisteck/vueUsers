const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const CONFIG = require('../../config/config');

const app = express();

app.use(history());
app.use('/', express.static(path.join(__dirname, CONFIG.distPath)));
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Coucou' });
});

app.listen(CONFIG.PORT, () => console.log(`Server listening on port ${CONFIG.PORT}`));
