import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import AccessDenied from "../pages/Admin/AccessDenied";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No Clerk token");

        await api.get("/admin/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!mounted) return;
        setAllowed(true);
      } catch (err) {
        if (!mounted) return;
        setAllowed(false);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, [getToken]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
            Checking permissions…
          </div>
        ) : allowed ? (
          children
        ) : (
          <AccessDenied />
        )}
      </SignedIn>
    </>
  );
}