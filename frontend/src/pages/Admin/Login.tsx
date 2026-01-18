import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  const adminBase = import.meta.env.VITE_ADMIN_BASE || '/admin';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-800 shadow-xl",
          }
        }}
        routing="path"
        path={`${adminBase}/login`}
        afterSignInUrl={adminBase}
      />
    </div>
  );
}