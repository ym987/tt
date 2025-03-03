const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function createLogsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logs (
          id SERIAL PRIMARY KEY,
          ttID TEXT NOT NULL UNIQUE
      );
    `);
    console.log("Logs table created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

async function saveLog(ttID) {
  try {
    await createLogsTable();
    console.log("Saving log for ttID:", ttID);
    const queryText = "INSERT INTO logs (ttID) VALUES ($1) ON CONFLICT (ttID) DO NOTHING";
    await pool.query(queryText, [ttID]);
    console.log("Log saved successfully.");
  } catch (error) {
    console.error("Error saving to table:", error);
  }
}

async function getLogs() {
  try {
    await createLogsTable();
    const result = await pool.query("SELECT * FROM logs");
    console.log("Logs fetched successfully.");
    return result.rows;
  } catch (error) {
    console.error("Error fetching logs:", error);
  }
}

module.exports = { saveLog, getLogs };