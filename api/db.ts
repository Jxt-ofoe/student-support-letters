import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

export async function initDb() {
  try {
    await turso.execute(`CREATE TABLE IF NOT EXISTS pending_letters (id TEXT PRIMARY KEY, letterText TEXT NOT NULL, nickname TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, status TEXT DEFAULT 'pending')`);
    await turso.execute(`CREATE TABLE IF NOT EXISTS approved_letters (id TEXT PRIMARY KEY, letterText TEXT NOT NULL, nickname TEXT, createdAt DATETIME, approvedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await turso.execute(`CREATE TABLE IF NOT EXISTS app_visits (id TEXT PRIMARY KEY, visitedAt DATETIME DEFAULT CURRENT_TIMESTAMP, userAgent TEXT)`);
  } catch (error) {
    console.error("DB Init Error:", error);
  }
}
