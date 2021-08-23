const express = require('express');
const path = require('path');
const pool = require('../db/db.js');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}))
app.use(express.static(path.join('build')))
app.use(express.json());

const schema = buildSchema(`
  type Query {
    users: [User]
    user(name: String!): User
    userScores(username: String!): [Score]
    song(name: String!): Song
    songs: [Song]
  },
  type Mutation {
    postScore(details: NewScore!): Score
    postUser(credentials: NewUser!): User
  },
  type User {
    id: Int
    name: String
    password: String
  },
  type Score {
    id: Int
    username: String
    score: Int
    difficulty: String
    song: String
  },
  type Song {
    id: Int
    bpm: Int
    name: String
    song_text: String
    filename: String
  },
  input NewScore {
    username: String
    score: Int
    difficulty: String
    song: String
  }
  input NewUser {
    name: String
    password: String
  }
`);

const getUser = async (args) => {
  const userData = await pool.query(`SELECT * FROM user_credentials WHERE name='${args.name}'`);
  return userData.rows[0];
}

const getUsers = async () => {
  const users = await pool.query('SELECT * FROM user_credentials');
  return users.rows
}

const getUserScores = async (args) => {
  const userScoresData = await pool.query(`SELECT * FROM scores WHERE username='${args.username}'`);
  return userScoresData.rows.sort((a, b) => {
    return b.score - a.score;
  })
}

const getSong = async (args) => {
  const songData = await pool.query(`SELECT * FROM songs WHERE name='${args.name}'`);
  return songData.rows[0];
}

const getSongs = async () => {
  const songsData = await pool.query('SELECT * FROM songs');
  return songsData.rows;
}

const postScore = async (args) => {
  const text = `INSERT INTO scores (username, score, difficulty, song) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [args.details.username, args.details.score, args.details.difficulty, args.details.song]
  const scoreData = await pool.query(text, values);
  return scoreData.rows[0];
}

const postUser = async (args) => {
  const text = `INSERT INTO user_credentials (name, password) VALUES ('${args.credentials.name}', '${args.credentials.password}') RETURNING *`;
  const userData = await pool.query(text);
  return userData.rows[0];
}

const root = {
  users: getUsers,
  user: getUser,
  userScores: getUserScores,
  song: getSong,
  songs: getSongs,
  postScore: postScore,
  postUser: postUser
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(4000, () => {
  console.log('listening on port 4000');
});

