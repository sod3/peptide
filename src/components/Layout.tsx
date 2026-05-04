import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24">{children}</main>
    <Footer />
    <Chatbot />
  </div>
);
