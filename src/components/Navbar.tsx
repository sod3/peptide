import { NavLink, Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="container">
        <div className={`glass flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "shadow-elegant bg-background/80" : "bg-card/40 border-transparent shadow-none"}`}>
          <Logo />
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive ? "bg-primary text-primary-foreground shadow-glow" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden gap-2 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 shadow-glow transition-all sm:inline-flex px-6">
              <Link to="/shop"><ShoppingBag className="h-4 w-4" />Shop</Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden text-foreground hover:bg-primary/10 transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass mt-3 rounded-[2rem] p-3 md:hidden shadow-elegant"
            >
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-5 py-4 text-base font-medium transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground shadow-md" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 px-2 pb-2">
                 <Button asChild className="w-full justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground shadow-glow py-6">
                  <Link to="/shop"><ShoppingBag className="h-5 w-5" />Shop Catalog</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
