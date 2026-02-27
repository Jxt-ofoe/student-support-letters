import { turso, initDb } from "./db";
import { nanoid } from "nanoid";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}
