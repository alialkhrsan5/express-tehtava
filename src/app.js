import express from 'express';
import api from './api/index.js'; 

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data
app.use(express.urlencoded({extended: true}));

// Staattisten tiedostojen tarjoilu
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/api/v1', api);

export default app;