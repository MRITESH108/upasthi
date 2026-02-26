const pool = require("../db/index");

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS colleges (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL UNIQUE,
      password    TEXT NOT NULL,
      collegecode INT  NOT NULL UNIQUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_codes (
      id           SERIAL PRIMARY KEY,
      college_id   INT NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
      code         VARCHAR(10) NOT NULL,
      generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at   TIMESTAMPTZ NOT NULL,
      created_by   INT NOT NULL,
      UNIQUE (college_id, code)
    );
  `);

  console.log("✅ Tables ensured");
}

module.exports = initDb;