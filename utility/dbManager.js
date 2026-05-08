//const mysql = require('mysql2');

require('dotenv').config();

const {Pool} = require('pg');


// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'vinodkumar2004',
//     database: 'siptracker',
//     port : 3306
// })

// connection.connect((err) => {

//     if (err) {
//         console.log(err)
//     } else {
//         console.log('MySQL Connected')
//     }
// })

// module.exports = connection


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})

pool.connect()
    .then(() => {
        console.log('PostgreSQL Connected')
    })
    .catch((err) => {
        console.log(err.message)
    })

module.exports = pool