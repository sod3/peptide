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
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container max-w-7xl">
        <div className={`relative flex items-center justify-between rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur-xl transition-all duration-700 ease-premium shadow-elegant ${
          scrolled ? "mx-4" : "mx-0"
        }`}>
          <Logo />
          
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-5 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 ${
                    isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/5"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden h-9 px-6 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 sm:inline-flex">
              <Link to="/shop" className="flex items-center gap-2">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span className="text-[13px] font-medium">Explore Catalog</span>
              </Link>
            </Button>
            
            <button 
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/50 md:hidden"
              onClick={() => setOpen(!open)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-full mt-4 flex flex-col gap-1 rounded-3xl border border-border/40 bg-background/95 p-3 backdrop-blur-xl shadow-2xl md:hidden"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl px-5 py-4 text-sm font-medium transition-colors ${
                        isActive ? "bg-primary/5 text-primary" : "hover:bg-muted"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-2 border-t border-border/40 pt-2">
                <Button asChild className="w-full h-12 rounded-2xl bg-primary text-primary-foreground">
                  <Link to="/shop">Explore Catalog</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
