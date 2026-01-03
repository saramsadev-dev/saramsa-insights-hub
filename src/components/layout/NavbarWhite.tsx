import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/saramsa-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Integrations", path: "/integrations" },
  { name: "About", path: "/about" },
  { name: "Partnerships", path: "/partnerships" },
  { name: "Pricing", path: "/pricing" },
  { name: "Demo", path: "/demo" },
  { name: "Contact", path: "/contact" },
];

export const NavbarWhite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Saramsa.ai"
              className="h-8 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors
                    ${isActive ? "text-white" : "text-white/70 hover:text-white"}
                  `}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="hero" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-white/80 transition-colors"
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
            className="lg:hidden bg-black border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" asChild>
                  <Link to="/demo" onClick={() => setIsOpen(false)}>Try Demo</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
