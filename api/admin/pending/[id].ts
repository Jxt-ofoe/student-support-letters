import { turso, initDb } from "../../db";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
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
