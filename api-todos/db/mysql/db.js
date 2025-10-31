import mysql from 'mysql2/promise';
import { loadEnvFile } from 'node:process'


if (!process.env.DB_HOST) {
    loadEnvFile()
}

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});