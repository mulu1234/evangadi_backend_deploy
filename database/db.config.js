const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  connectTimeout: 10000,
});

// Connect to the database
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  
  // Connection test
  conn.execute(`SELECT 'test'`, (err, result) => {
    conn.release(); // Release the connection back to the pool
    if (err) return console.error(err.message);

    console.log(result);
  });
});

// Export the connection for use in other modules
module.exports = connection.promise();


// const mysql2 = require("mysql2");
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// // Create a connection pool
// const pool = mysql2.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   connectionLimit: 10,
//   connectTimeout: 10000,
// });

// // Connect to the database and test the connection
// pool.getConnection((err, conn) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database");
  
//   // Run a simple query
//   conn.execute("SELECT 'test'", (err, result) => {
//     conn.release(); // Release the connection back to the pool
//     if (err) {
//       console.error("Query failed:", err.message);
//       return;
//     }

//     console.log("Query result:", result);
//   });
// });

// // Export the connection pool for use in other modules
// module.exports = pool.promise();