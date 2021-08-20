const pool = require('db.js');

pool.query(
    `CREATE TABLE user (
        id serial NOT NULL,
        name varchar(255),
        password varchar(255),
        PRIMARY KEY (id)
    )`
)

pool.query(
    `CREATE TABLE scores (
        id serial NOT NULL,
        user varchar(255),
        score int,
        difficulty varchar(255),
        PRIMARY KEY (id)
    )`
)

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