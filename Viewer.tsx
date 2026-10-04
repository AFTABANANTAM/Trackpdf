"use client";
import { useEffect, useRef, useState } from "react";

export default function Viewer({ slug, title, allowDownload }: { slug: string; title: string; allowDownload: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const sid = useRef<string>();
  const [status, setStatus] = useState("Loading PDF…");

  const send = (type: string, page?: number) =>
    fetch(`/api/s/${slug}/event`, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, page, sessionId: sid.current }) }).then((r) => r.json()).catch(() => ({}));

  useEffect(() => {
    let dead = false;
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      if (dead) return;
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const o = await send("OPEN");
      sid.current = o.sessionId;
      const pdf = await pdfjs.getDocument(`/api/s/${slug}/file`).promise;
      setStatus("");
      const seen = new Set<number>();
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        const n = Number((e.target as HTMLElement).dataset.p);
        if (e.isIntersecting && !seen.has(n)) { seen.add(n); send("PAGE_VIEW", n); }
      }), { threshold: 0.5 });
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const c = document.createElement("canvas");
        c.width = vp.width; c.height = vp.height; c.dataset.p = String(i);
        c.className = "w-full h-auto bg-white border-[3px] border-ink rounded-xl shadow-pop mb-6";
        if (dead) return;
        box.current?.appendChild(c);
        await page.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
        io.observe(c);
      }
    })().catch(() => setStatus("Could not load this PDF."));
    return () => { dead = true; };
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h1 className="font-display text-2xl truncate">{title}</h1>
        {allowDownload && (
          <button className="btn btn-ink text-sm" onClick={() => (window.location.href = `/api/s/${slug}/file?download=1&sid=${sid.current ?? ""}`)}>Download</button>
        )}
      </div>
      {status && <p className="card font-bold">{status}</p>}
      <div ref={box} />
    </div>
  );
}
