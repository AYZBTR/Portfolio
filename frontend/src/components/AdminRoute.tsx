import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import AccessDenied from "../pages/Admin/AccessDenied";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        // If this succeeds => user is admin (authMiddleware passed)
        await api.get("/admin/check");
        if (!mounted) return;
        setAllowed(true);
      } catch (err: any) {
        if (!mounted) return;

        const status = err?.response?.status;

        // 403 => signed in but not admin
        if (status === 403) {
          setAllowed(false);
        } else {
          // 401 or other errors => treat as not allowed
          setAllowed(false);
        }
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, []);

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