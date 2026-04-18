import { useClerk } from "@clerk/clerk-react";

export default function AccessDenied() {
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
      <div className="max-w-xl w-full rounded-2xl border border-red-500/30 bg-slate-900/60 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-red-300">Access denied</h1>

        <p className="mt-3 text-slate-300">
          Sorry, you do not have enough permission to access this page. Contact
          your management team.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold"
          >
            Sign out
          </button>

          <a
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}