# senecloud-back
# Auteur: Alioune badara diouf

#Utilisation:

1-) clone le projet

2-) " npm install " Pour installer les dependences et packages

3-) Creation de la base de donne postgresql:

3-1) Ouvrire telminal cmd et excute: 

    " psql -d postgres -U your_username "
 
3-2)Execute les code sql suivant pour la  Creation du base de donnees :

  CREATE DATABASE senecloud;
  
3-3) Entre dans la base senecloud
  
  \c senecloud

3-4) Creation des table :
  
CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(30), password VARCHAR(255));

CREATE TABLE personne (id SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), status VARCHAR(30));

3-5) creation de l'admin user

  INSERT INTO users (username, password) VALUES ('admin', 'passer');
  
4-) Editer le fichier(repertoire_of_projet/db/Database.js) de configuration du base de donnes qui se trouve dans le projet 
en donnent votre username et password pour permetre le a expresse de se connecter dans la base de donnes

    
