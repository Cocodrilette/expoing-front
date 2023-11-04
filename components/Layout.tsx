import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
