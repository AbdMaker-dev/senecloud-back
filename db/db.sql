CREATE DATABASE senecloud;

-- \c pour se connecter a la base senecloud
CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(30), password VARCHAR(255));

CREATE TABLE personne (id SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), status VARCHAR(30));

INSERT INTO users (username, password)
  VALUES ('admin', 'passer');

INSERT INTO personne (name, email, status)
  VALUES ('Alioune Badara Diouf', 'dioufalioune@gmail.com.com', 'actived');