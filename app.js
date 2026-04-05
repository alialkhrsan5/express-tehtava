import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Tehtävä 10: Staattisten tiedostojen tarjoilu 'public'-kansiosta
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// Tehtävä 8: Kissareitti
app.get('/api/v1/cats', (req, res) => {
  const cat = {
    cat_id: 1,
    name: "Mouru",
    birthdate: "2020-05-12",
    weight: 5.5,
    owner: "Matti Meikäläinen",
    image: "https://loremflickr.com/320/240/cat"
  };
  
  res.json(cat); // Palautetaan kissaolio JSON-muodossa
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});