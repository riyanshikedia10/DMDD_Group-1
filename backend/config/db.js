const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // Set to true if using Azure
    trustServerCertificate: true, // For local development
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// For Windows Authentication, use this instead:
// const config = {
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     trustedConnection: true,
//   },
// };

// Create pool promise but don't exit on failure - let routes handle it
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    console.warn('Server will continue running but database operations will fail.');
    // Return a rejected promise that routes can catch
    return Promise.reject(err);
  });

// Helper function to safely get the pool
const getPool = async () => {
  try {
    return await poolPromise;
  } catch (err) {
    throw new Error('Database connection not available. Please check your database configuration.');
  }
};

module.exports = { sql, poolPromise, getPool };