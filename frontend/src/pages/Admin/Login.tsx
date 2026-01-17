import { SignIn } from "@clerk/clerk-react";

export default function Login() {
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
        path="/admin/login"
        afterSignInUrl="/admin"
      />
    </div>
  );
}