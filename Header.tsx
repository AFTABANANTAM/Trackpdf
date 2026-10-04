import Link from "next/link";
import { signOut } from "@/auth";
export default function Header({ email }: { email?: string | null }) {
  return (
    <header className="bg-ink text-sunny border-b-[3px] border-ink">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/dashboard" className="font-display text-2xl">Track<span className="text-bubble">PDF</span></Link>
        {email && (
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }} className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-white">{email}</span>
            <button className="btn btn-pink !py-1 text-sm">Sign out</button>
          </form>
        )}
      </div>
    </header>
  );
}
