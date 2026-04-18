import { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, useClerk } from "@clerk/clerk-react";
import { ShieldX, LogOut } from "lucide-react";
import api from "../services/api";

function AdminCheck({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<"loading" | "ok" | "forbidden">("loading");
  const { signOut } = useClerk();

  useEffect(() => {
    api
      .get("/admin/check")
      .then(() => setStatus("ok"))
      .catch((err) => {
        setStatus("forbidden");
        if (err?.response?.status !== 403) {
          console.error("Admin check failed:", err?.message);
        }
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-lg">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
              <ShieldX className="relative text-red-500" size={120} strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 mb-4">
            Access Denied
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-300 mb-4 max-w-lg mx-auto">
            Sorry, you do not have enough permission to access this page.
          </p>
          <p className="text-gray-500 mb-10">Contact your management team.</p>

          {/* Sign Out */}
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/30"
          >
            <LogOut size={22} />
            Sign Out
          </button>

          {/* Decorative dots */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default function AdminRoute({ children }: { children: JSX.Element }) {
  return (
    <>
      <SignedIn>
        <AdminCheck>{children}</AdminCheck>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
