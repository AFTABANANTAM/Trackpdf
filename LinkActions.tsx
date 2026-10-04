"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LinkActions({ id, url, revoked }: { id: string; url: string; revoked: boolean }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex gap-2 flex-wrap">
      {!revoked && <button className="btn text-sm !py-1" onClick={async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? "Copied" : "Copy link"}</button>}
      {!revoked && <button className="btn btn-ink text-sm !py-1" onClick={async () => { if (confirm("Revoke this link? Viewers lose access immediately.")) { await fetch(`/api/links/${id}`, { method: "PATCH" }); router.refresh(); } }}>Revoke</button>}
      {revoked && <span className="chip !bg-bubble">Revoked</span>}
    </div>
  );
}
