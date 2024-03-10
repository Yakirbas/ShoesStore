import mysql from 'mysql'
import * as dotenv from 'dotenv'
dotenv.config()

export const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.DB_PASS,
    database:process.env.DATABASE
  });