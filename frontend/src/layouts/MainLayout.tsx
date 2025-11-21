import Navbar from "../components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <Navbar />

      <main className="pt-20 w-full">
        {children}
      </main>
    </div>
  );
}
