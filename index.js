const express = require("express");
const bodyParser = require('body-parser');
const database = require('./db/Database')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

// Les routes de l'api ------------------------------------------------------
app.get('/api/personnes', database.getAllPersonne);
app.get('/api/personnes/:id', database.getPersonneById);
app.post('/api/personnes', database.createPersonne);
app.put('/api/personnes/:id', database.updatePersonne);
app.delete('/api/personnes/:id', database.deletePersonne);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

