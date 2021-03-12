const Pool = require('pg').Pool
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'alioune',
  host: 'localhost',
  database: 'senecloud',
  password: 'alioune',
  port: 5432,
});


const getAllPersonne = (request, response) => {
    pool.query('SELECT * FROM personne ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getPersonneById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM personne WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const login = (request, response) =>{
    const { username, password } = request.body;
    const accessTokenSecret = 'youraccesstokensecret';
    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      if (results.rows) {
        const user = results.rows;
        // Generation du  un token access
        const accessToken = jwt.sign({ username: user[0].username}, accessTokenSecret);
        response.json({
            accessToken
        });
    } else {
        response.send('Username or password incorrect');
    }

    });
  }

  const createPersonne = (request, response) => {
    const { name, email } = request.body
    pool.query('INSERT INTO personne (name, email, status) VALUES ($1, $2, $3)', [name, email, 'actived'], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Personne added with ID: ${result}`)
    })
  }

  const updatePersonne = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE personne SET name = $1, email = $2, status = $3 WHERE id = $4',
      [name, email, status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Personne modified with ID: ${id}`)
      }
    )
  }  

  const deletePersonne = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM personne WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const authenticateJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessTokenSecret = 'youraccesstokensecret';
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }
            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
};


module.exports = {
    getAllPersonne,
    getPersonneById,
    createPersonne,
    updatePersonne,
    deletePersonne,
    login,
    authenticateJWT
  }