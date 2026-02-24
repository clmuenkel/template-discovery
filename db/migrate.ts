import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(url);
  const migration = readFileSync(join(__dirname, "migrate.sql"), "utf-8");

  console.log("Running migration...");
  await sql.query(migration);
  console.log("Migration complete.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
