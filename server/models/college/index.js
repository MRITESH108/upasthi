// config/initDb.js
const pool = require("./config/db");

const createCollegesTableQuery = `
  CREATE TABLE IF NOT EXISTS colleges (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    collegecode INT  NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const createDailyCodesTableQuery = `
  CREATE TABLE IF NOT EXISTS daily_codes (
    id           SERIAL PRIMARY KEY,
    college_id   INT NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    code         VARCHAR(10) NOT NULL,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at   TIMESTAMPTZ NOT NULL,
    created_by   INT NOT NULL,
    UNIQUE (college_id, code)
  );
`;

const createIndexesQuery = `
  CREATE INDEX IF NOT EXISTS idx_daily_codes_college_generated
  ON daily_codes (college_id, generated_at DESC);

  CREATE INDEX IF NOT EXISTS idx_daily_codes_expires
  ON daily_codes (expires_at);
`;

async function initDb() {
  try {
    await pool.query(createCollegesTableQuery);
    await pool.query(createDailyCodesTableQuery);
    await pool.query(createIndexesQuery);
    console.log("✅ DB schema ensured (colleges, daily_codes)");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    throw err;
  }
}

module.exports = initDb;