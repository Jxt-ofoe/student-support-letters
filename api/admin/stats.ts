import { turso, initDb } from "../../db";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await turso.execute("SELECT COUNT(*) as total FROM app_visits");
    const totalVisits = result.rows[0]?.total || 0;
    res.json({ totalVisits });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
