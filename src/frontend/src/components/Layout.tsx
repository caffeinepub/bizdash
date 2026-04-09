import { Toaster } from "@/components/ui/sonner";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-1 w-full" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
