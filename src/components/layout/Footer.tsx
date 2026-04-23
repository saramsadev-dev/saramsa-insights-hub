import { Link } from "react-router-dom";
import logo from "@/assets/saramsa-logo.png";

const footerLinks = {
  product: [
    { name: "Features", path: "/#features" },
    { name: "Demo", path: "/#demo" },
    { name: "Integrations", path: "/integrations#output-tracking" },
    { name: "Pricing", path: "/pricing#plans" },
  ],
  company: [
    { name: "About", path: "/about" },
    { name: "Partnerships", path: "/integrations#partnerships" },
    { name: "Contact", path: "/about#contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      {/* Gradient separator line */}
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="bg-card/20">
        <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Brand */}
            <div className="col-span-2 md:col-span-6">
              <Link to="/" className="inline-flex items-center mb-4 group">
                <img src={logo} alt="Saramsa.ai" className="h-7 w-auto transition-transform group-hover:scale-105" />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Raw feedback to roadmap in seconds — powered by AI.
              </p>
            </div>

            {/* Product */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-[0.15em]">Product</h4>
              <ul className="space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-[0.15em]">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-border/40">
            <p className="text-xs text-muted-foreground/70 text-center md:text-left">
              &copy; {new Date().getFullYear()} Saramsa.ai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
