import { turso, initDb } from "../db";
import { nanoid } from "nanoid";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}
