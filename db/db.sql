CREATE DATABASE senecloud;

-- \c pour se connecter a la base senecloud

CREATE TABLE personne (id SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), status VARCHAR(30));

INSERT INTO personne (name, email, status)
  VALUES ('Alioune Badara Diouf', 'dioufalioune@gmail.com.com', 'actived');