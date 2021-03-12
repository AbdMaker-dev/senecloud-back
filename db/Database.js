const Pool = require('pg').Pool

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


module.exports = {
    getAllPersonne,
    getPersonneById,
    createPersonne,
    updatePersonne,
    deletePersonne,
  }