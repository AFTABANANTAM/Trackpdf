import { randomBytes } from "crypto";
import { db } from "./db";
export const newSlug = () => randomBytes(9).toString("base64url");
export async function getActiveLink(slug: string) {
  const l = await db.shareLink.findUnique({ where: { slug }, include: { document: true } });
  if (!l || l.revokedAt || (l.expiresAt && l.expiresAt < new Date())) return null;
  return l;
}
