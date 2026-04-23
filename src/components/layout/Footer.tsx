import { Link } from "react-router-dom";
import logo from "@/assets/saramsa-logo.png";

const productLinks = [
  { name: "Features", path: "/#features" },
  { name: "Demo", path: "/#demo" },
  { name: "Integrations", path: "/integrations#output-tracking" },
  { name: "Pricing", path: "/pricing#plans" },
];

const companyLinks = [
  { name: "About", path: "/about" },
  { name: "Partnerships", path: "/integrations#partnerships" },
  { name: "Contact", path: "/about#contact" },
];

const getInTouchLinks = [
  { name: "Book a Demo", href: "/about#contact", external: false },
  { name: "Email Us", href: "mailto:saramsa.aiventures@gmail.com", external: true },
  { name: "Sign In", href: "https://saramsa-ai.vercel.app/", external: true },
];

const linkClass =
  "text-[13px] text-muted-foreground hover:text-primary transition-colors duration-200";
const headingClass =
  "text-[11px] font-semibold text-foreground/80 mb-4 uppercase tracking-[0.18em]";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute top-0 left-0 right-0 section-separator" />

      <div className="bg-card/20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 items-start">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-flex items-center mb-3 group">
                <img
                  src={logo}
                  alt="Saramsa.ai"
                  className="h-6 w-auto transition-transform group-hover:scale-105"
                />
              </Link>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[240px]">
                Raw feedback to roadmap in seconds — powered by AI.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className={headingClass}>Product</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className={headingClass}>Company</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in touch */}
            <div>
              <h4 className={headingClass}>Get in touch</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {getInTouchLinks.map((link) =>
                  link.external ? (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className={linkClass}
                      >
                        {link.name}
                      </a>
                    </li>
                  ) : (
                    <li key={link.name}>
                      <Link to={link.href} className={linkClass}>
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/30 flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground/60">
              &copy; {new Date().getFullYear()} Saramsa.ai
            </p>
            <p className="text-[11px] text-muted-foreground/50">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
