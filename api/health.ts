import { turso, initDb } from "./db";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initDb();

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await turso.execute("SELECT 1");
    return res.json({ status: "ok" });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
