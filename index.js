const express = require("express");
const bodyParser = require('body-parser');
const database = require('./db/Database');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});


// Les routes de l'api ------------------------------------------------------
app.post('/api/login', database.login);
app.get('/api/personnes', database.authenticateJWT, database.getAllPersonne);
app.get('/api/personnes/:id', database.authenticateJWT, database.getPersonneById);
app.post('/api/personnes', database.authenticateJWT, database.createPersonne);
app.put('/api/personnes/:id', database.authenticateJWT, database.updatePersonne);
app.delete('/api/personnes/:id', database.authenticateJWT, database.deletePersonne);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

