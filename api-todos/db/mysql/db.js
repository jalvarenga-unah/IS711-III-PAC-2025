import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: proccess.env.DB_HOST,
    user: proccess.env.DB_USER,
    database: proccess.env.DATABASE,
    port: proccess.env.DB_PORT,
    password: proccess.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});