const pool = require('./db.js');

pool.query('DROP TABLE user_credentials')
  .then(() => {
    pool.query(
      `CREATE TABLE user_credentials (
        id serial NOT NULL,
        name varchar(255),
        password varchar(255),
        PRIMARY KEY (id)
      )`
    )
    .catch((err) => {
      console.log(err);
    });
  });

pool.query('DROP TABLE scores')
  .then(() => {
    pool.query(
      `CREATE TABLE scores (
        id serial NOT NULL,
        username varchar(255),
        score int,
        difficulty varchar(255),
        song varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )`
    )
    .catch((err) => {
      console.log(err);
    });
  });

pool.query('DROP TABLE songs')
  .then(() => {
    pool.query(
      `CREATE TABLE songs (
        id serial NOT NULL,
        bpm int,
        name varchar(255),
        song_text text,
        filename varchar(255),
        PRIMARY KEY (id)
      )`
    )
    .catch((err) => {
      console.log(err);
    });
  });