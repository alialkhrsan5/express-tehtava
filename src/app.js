import express from 'express';
import api from './api/index.js'; // Tuodaan äsken tehty API-reititin

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

// Otetaan uusi reititinjärjestelmä käyttöön! Kaikki alkaa '/api/v1'
app.use('/api/v1', api);

export default app;