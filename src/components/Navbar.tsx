import { NavLink, Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "./ui/button";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container">
        <div className={`glass flex items-center justify-between rounded-full px-3 py-2 shadow-card transition-all ${scrolled ? "" : ""}`}>
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button asChild size="sm" className="hidden gap-2 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-95 sm:inline-flex">
              <Link to="/shop"><ShoppingBag className="h-4 w-4" />Shop</Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-2 md:hidden">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
