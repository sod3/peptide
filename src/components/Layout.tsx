import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
      <main className="pt-24">{children}</main>
      <div className="bg-primary/5 border-y border-primary/10 py-3 text-center px-4">
        <p className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] text-primary/80">
          Strictly for in-vitro laboratory research. Not for human or veterinary use.
        </p>
      </div>
      <Footer />
    <Chatbot />
  </div>
);
