import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/3d/GlowOrb";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      <SEO
        title="404 — Page Not Found | Saramsa.ai"
        description="The page you're looking for doesn't exist. Return to Saramsa.ai to explore AI-powered customer feedback analysis."
        canonical="/404"
        noIndex={true}
      />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <GlowOrb size={400} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 px-4"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Return to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
