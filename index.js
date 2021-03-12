const express = require("express");
const bodyParser = require('body-parser');
const database = require('./db/Database');
var cors = require('cors');

const app = express();
// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3001', '']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
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
app.get('/api/personnes/search/:search', database.authenticateJWT, database.searchePersonne);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

