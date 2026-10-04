import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  if ((await auth())?.user) redirect("/dashboard");
  return (
    <main className="max-w-3xl mx-auto px-5 py-16 text-center">
      <h1 className="font-display text-6xl sm:text-7xl leading-none">Track<span className="bg-ink text-sunny px-2 rounded-xl ml-1">PDF</span></h1>
      <p className="mt-6 text-2xl font-extrabold">Share PDFs. Know who accessed them.</p>
      <p className="mt-3 max-w-xl mx-auto">Upload a PDF, send one tracked link, and see who opened it, which pages they read, and whether they downloaded it.</p>
      <form className="mt-8" action={async () => { "use server"; await signIn("google", { redirectTo: "/dashboard" }); }}>
        <button className="btn btn-ink text-lg">Continue with Google</button>
      </form>
      <div className="grid sm:grid-cols-3 gap-4 mt-14 text-left">
        {[["Tracked links","One unique link per share. Revoke it any time."],["Viewer identity","Ask viewers to sign in with Google before they read."],["Page analytics","Opens, unique viewers, downloads and pages read."]].map(([t,d])=>(
          <div key={t} className="card"><h3 className="font-extrabold text-lg">{t}</h3><p className="text-sm mt-1">{d}</p></div>
        ))}
      </div>
    </main>
  );
}
