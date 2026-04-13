import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ArrowRight, MessageSquare, Zap, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Pipeline Animation: "The Refinery"
   Feedback ──▸ Saramsa ──▸ Action Items
   (closest to Monter's Startup → Monter → Investor)
   ────────────────────────────────────────── */

const PipelineAnimation = () => {
  const [animState, setAnimState] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setAnimState(1), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animState === 1) {
      const t = setTimeout(() => setAnimState(2), 2000);
      return () => clearTimeout(t);
    }
    if (animState === 2) {
      const t = setTimeout(() => setAnimState(3), 2000);
      return () => clearTimeout(t);
    }
    if (animState === 3) {
      const t = setTimeout(() => setAnimState(0), 1000);
      return () => clearTimeout(t);
    }
  }, [animState]);

  return (
    <div className="flex flex-row justify-center items-center relative z-10 mb-10">
      {/* Left badge – Feedback */}
      <div className="flex items-center gap-2 text-sm md:text-base rounded-xl px-4 py-2.5 glass text-white z-10 shadow-lg border border-white/5">
        <MessageSquare className="w-5 h-5 text-primary" />
        <span className="font-medium">Feedback</span>
      </div>

      {/* Left flowing line */}
      <div className="w-8 md:w-14 h-[2px] bg-white/10 relative overflow-hidden">
        {(animState === 1 || animState === 2) && (
          <motion.div
            className="absolute inset-0 h-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </div>

      {/* Center – Saramsa */}
      <motion.div
        className={`rounded-xl p-[1.5px] z-10 shadow-lg transition-all duration-500 ${
          animState === 2
            ? "bg-gradient-primary"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight rounded-xl px-4 md:px-5 py-2 md:py-2.5 bg-card">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-gradient">Saramsa</span>
        </div>
      </motion.div>

      {/* Right flowing line */}
      <div className="w-8 md:w-14 h-[2px] bg-white/10 relative overflow-hidden">
        {(animState === 1 || animState === 2) && (
          <motion.div
            className="absolute inset-0 h-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </div>

      {/* Right badge – Action Items */}
      <div className="flex items-center gap-2 text-sm md:text-base rounded-xl px-4 py-2.5 glass text-white z-10 shadow-lg border border-white/5">
        <CheckSquare className="w-5 h-5 text-primary" />
        <span className="font-medium">Action Items</span>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   Character-by-Character Text Animation
   ────────────────────────────────────────── */

const RotatingText = () => {
  const phrases = useMemo(
    () => ["Prioritized Features", "Build-Ready Stories", "Actionable Roadmaps"],
    []
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2700);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className="text-3xl md:text-5xl lg:text-6xl font-bold overflow-hidden h-[1.3em]">
      <AnimatePresence mode="wait">
        <span key={index} className="inline-block">
          {phrases[index].split("").map((letter, i) => (
            <motion.span
              key={`${index}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.42, 0, 0.58, 1],
                delay: i * 0.02,
              }}
              className="text-gradient"
              style={{ display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </span>
      </AnimatePresence>
    </div>
  );
};

/* ──────────────────────────────────────────
   Page
   ────────────────────────────────────────── */

const Test1A = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={500} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" delay={0.2} />
        <GlowOrb size={400} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" delay={0.5} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Pipeline animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PipelineAnimation />
            </motion.div>

            {/* Static line */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight tracking-tight"
            >
              Transform feedback into
            </motion.h1>

            {/* Rotating text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <RotatingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Saramsa.ai processes raw customer feedback and turns it into
              prioritized features and build-ready user stories — in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/about#contact">
                  Book a demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Test1A;
