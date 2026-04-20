import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/saramsa-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Integrations", path: "/integrations" },
  { name: "Pricing", path: "/pricing" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Saramsa.ai" className="h-6 md:h-7 lg:h-8 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-card/40 rounded-full px-2 py-1.5 border border-border/40">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full bg-secondary/80 border border-border/60"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/about#contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-primary-btn px-4 py-1.5 text-sm font-semibold text-white hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
            >
              Contact Us
            </Link>
            <a
              href="https://saramsa-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-lg p-[2px] bg-gradient-primary-btn hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
            >
              <span className="inline-flex items-center gap-1.5 justify-center rounded-md bg-background px-4 py-1.5 text-sm font-semibold text-foreground">
                Login
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
                <Link
                  to="/about#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full rounded-lg bg-gradient-primary-btn px-5 py-2.5 text-sm font-semibold text-white hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
                >
                  Contact Us
                </Link>
                <a
                  href="https://saramsa-ai.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="relative flex items-center justify-center w-full rounded-lg p-[2px] bg-gradient-primary-btn hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
                >
                  <span className="flex items-center gap-1.5 justify-center w-full rounded-md bg-background px-5 py-2.5 text-sm font-semibold text-foreground">
                    Login
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
