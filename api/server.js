const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSL === "true"
    ? { rejectUnauthorized: false }
    : false,
});

// Root endpoint (health check)
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is runningss"
  });
});

// /hello endpoint (DB test)
app.get("/hello", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as time");
    res.json({
      message: "hello",
      db_time: result.rows[0].time
    });
  } catch (err) {
    // Local ortamda DB private olduğu için hata NORMAL
    res.status(500).json({
      error: "Database connection failed",
      details: err.message
    });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
