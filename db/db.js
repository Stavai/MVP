const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'keyboarding-hero',
    password: 'maddog23',
    port: '5432'
})

module.exports = pool;  

