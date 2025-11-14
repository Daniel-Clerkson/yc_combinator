import { Suspense } from "react";
import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      {children}
    </main>
  );
}
