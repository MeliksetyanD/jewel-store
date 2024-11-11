import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()



const connection = mysql.createPool({
  connectionLimit: 10,
  host     : ,
  user     : 'admin',
  password : '12345678',
  port     : 3306,
  database: 'mydatabase',
  connectTimeout: 25000,
  queueLimit: 0
});




export default connection
