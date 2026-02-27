import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Turso Client
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

// Initialize Database
async function initDb() {
  console.log("DB Init Start");
  try {
    await turso.execute(`CREATE TABLE IF NOT EXISTS pending_letters (id TEXT PRIMARY KEY, letterText TEXT NOT NULL, nickname TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, status TEXT DEFAULT 'pending')`);
    await turso.execute(`CREATE TABLE IF NOT EXISTS approved_letters (id TEXT PRIMARY KEY, letterText TEXT NOT NULL, nickname TEXT, createdAt DATETIME, approvedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    await turso.execute(`CREATE TABLE IF NOT EXISTS app_visits (id TEXT PRIMARY KEY, visitedAt DATETIME DEFAULT CURRENT_TIMESTAMP, userAgent TEXT)`);
    console.log("DB Init Success");
  } catch (error) {
    console.error("DB Init Error:", error);
  }
}

// API Routes
app.get("/api/health", async (req, res) => {
  try {
    await turso.execute("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/api/visits", async (req, res) => {
  try {
    const id = nanoid();
    const userAgent = req.headers["user-agent"] || "Unknown";
    await turso.execute({
      sql: "INSERT INTO app_visits (id, userAgent) VALUES (?, ?)",
      args: [id, userAgent],
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/api/letters/approved", async (req, res) => {
  try {
    const result = await turso.execute("SELECT * FROM approved_letters ORDER BY approvedAt DESC LIMIT 100");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/api/letters/pending", async (req, res) => {
  const { letterText, nickname } = req.body;
  try {
    const id = nanoid();
    await turso.execute({
      sql: "INSERT INTO pending_letters (id, letterText, nickname) VALUES (?, ?, ?)",
      args: [id, letterText, nickname || "Anonymous"],
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Admin Routes
app.get("/api/admin/stats", async (req, res) => {
  try {
    const result = await turso.execute("SELECT COUNT(*) as total FROM app_visits");
    const totalVisits = result.rows[0]?.total || 0;
    res.json({ totalVisits });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/api/admin/pending", async (req, res) => {
  try {
    const result = await turso.execute("SELECT * FROM pending_letters ORDER BY createdAt DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/api/admin/approve/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pending = await turso.execute({
      sql: "SELECT * FROM pending_letters WHERE id = ?",
      args: [id],
    });

    if (pending.rows.length === 0) return res.status(404).json({ error: "Letter not found" });

    const letter = pending.rows[0];

    await turso.execute({
      sql: "INSERT INTO approved_letters (id, letterText, nickname, createdAt) VALUES (?, ?, ?, ?)",
      args: [letter.id, letter.letterText, letter.nickname, letter.createdAt],
    });

    await turso.execute({
      sql: "DELETE FROM pending_letters WHERE id = ?",
      args: [id],
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.delete("/api/admin/pending/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await turso.execute({
      sql: "DELETE FROM pending_letters WHERE id = ?",
      args: [id],
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

async function start() {
  await initDb();
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server on http://localhost:${PORT}`);
  });
}

start().catch(console.error);
