"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function UploadForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const f = new FormData(e.currentTarget);
    f.set("requireLogin", String(f.get("requireLogin") === "on"));
    f.set("allowDownload", String(f.get("allowDownload") === "on"));
    const r = await fetch("/api/documents", { method: "POST", body: f });
    setBusy(false);
    if (!r.ok) return setErr((await r.json()).error ?? "Upload failed");
    (e.target as HTMLFormElement).reset(); router.refresh();
  }
  return (
    <form onSubmit={onSubmit} className="card space-y-3">
      <h2 className="font-display text-xl">Upload a PDF</h2>
      <input name="title" required maxLength={120} placeholder="Document title" className="input" />
      <input name="file" type="file" accept="application/pdf" required className="input" />
      <label className="flex gap-2 font-bold"><input type="checkbox" name="requireLogin" defaultChecked className="accent-black w-5 h-5" /> Require Google sign-in</label>
      <label className="flex gap-2 font-bold"><input type="checkbox" name="allowDownload" className="accent-black w-5 h-5" /> Allow downloads</label>
      {err && <p className="text-sm font-bold bg-sunny border-2 border-ink rounded-lg p-2">{err}</p>}
      <button disabled={busy} className="btn btn-pink">{busy ? "Uploading…" : "Create tracked link"}</button>
    </form>
  );
}
