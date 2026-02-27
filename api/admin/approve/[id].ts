import { turso, initDb } from "../../db";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      const pending = await turso.execute({
        sql: "SELECT * FROM pending_letters WHERE id = ?",
        args: [id as string],
      });

      if (pending.rows.length === 0) return res.status(404).json({ error: "Letter not found" });

      const letter = pending.rows[0];

      await turso.execute({
        sql: "INSERT INTO approved_letters (id, letterText, nickname, createdAt) VALUES (?, ?, ?, ?)",
        args: [letter.id, letter.letterText, letter.nickname, letter.createdAt],
      });

      await turso.execute({
        sql: "DELETE FROM pending_letters WHERE id = ?",
        args: [id as string],
      });

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
