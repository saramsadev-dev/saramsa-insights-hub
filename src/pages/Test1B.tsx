import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  MessageSquare,
  Star,
  Headphones,
  Hash,
  Zap,
  CheckSquare,
  GitBranch,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Pipeline Animation: "Multi-Source Convergence"
   Multiple inputs  ──▸  Saramsa  ──▸  Structured outputs
   ────────────────────────────────────────── */

const sources = [
  { icon: MessageSquare, label: "Reviews" },
  { icon: Star, label: "Surveys" },
  { icon: Hash, label: "Slack" },
  { icon: Headphones, label: "Support" },
];

const outputs = [
  { icon: CheckSquare, label: "Roadmap" },
  { icon: FileText, label: "User Stories" },
  { icon: GitBranch, label: "Jira Tasks" },
];

const PipelineAnimation = () => {
  const [animState, setAnimState] = useState(1);

  // 8s cycle: flow-in (3s) → glow (2s) → flow-out (2s) → pause (1s)
  useEffect(() => {
    const interval = setInterval(() => setAnimState(1), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animState === 1) {
      const t = setTimeout(() => setAnimState(2), 3000);
      return () => clearTimeout(t);
    }
    if (animState === 2) {
      const t = setTimeout(() => setAnimState(3), 2000);
      return () => clearTimeout(t);
    }
    if (animState === 3) {
      const t = setTimeout(() => setAnimState(0), 2000);
      return () => clearTimeout(t);
    }
  }, [animState]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-12 hidden md:block">
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 700 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="line-grad-in" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary-hex)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary-hex)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="line-grad-out" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-secondary-hex)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-secondary-hex)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Left lines – converging into center */}
        {sources.map((_, i) => {
          const startY = 30 + i * 45;
          return (
            <motion.line
              key={`in-${i}`}
              x1={100}
              y1={startY}
              x2={310}
              y2={100}
              stroke="url(#line-grad-in)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                animState >= 1
                  ? { pathLength: 1, opacity: 0.7 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
            />
          );
        })}

        {/* Right lines – fanning out from center */}
        {outputs.map((_, i) => {
          const endY = 45 + i * 55;
          return (
            <motion.line
              key={`out-${i}`}
              x1={390}
              y1={100}
              x2={600}
              y2={endY}
              stroke="url(#line-grad-out)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                animState >= 3
                  ? { pathLength: 1, opacity: 0.7 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Layout */}
      <div className="flex items-center justify-between relative z-10" style={{ minHeight: 200 }}>
        {/* Left: Sources */}
        <div className="flex flex-col gap-2.5">
          {sources.map((src, i) => (
            <motion.div
              key={src.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-xs md:text-sm rounded-lg px-3 py-2 glass text-white border border-white/5"
            >
              <src.icon className="w-4 h-4 text-primary" />
              <span>{src.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Center: Saramsa */}
        <motion.div
          animate={
            animState === 2
              ? { scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(255,137,33,0)", "0 0 30px rgba(255,137,33,0.4)", "0 0 0px rgba(255,137,33,0)"] }
              : {}
          }
          transition={{ duration: 1.5, repeat: animState === 2 ? Infinity : 0 }}
          className={`rounded-xl p-[1.5px] z-10 shadow-lg transition-all duration-500 ${
            animState >= 2 ? "bg-gradient-primary" : "bg-transparent border border-white/10"
          }`}
        >
          <div className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight rounded-xl px-5 py-3 bg-card">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-gradient">Saramsa</span>
          </div>
        </motion.div>

        {/* Right: Outputs */}
        <div className="flex flex-col gap-2.5">
          {outputs.map((out, i) => (
            <motion.div
              key={out.label}
              initial={{ opacity: 0, x: 20 }}
              animate={
                animState >= 3
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0.3, x: 20 }
              }
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-2 text-xs md:text-sm rounded-lg px-3 py-2 glass text-white border border-white/5"
            >
              <out.icon className="w-4 h-4 text-primary" />
              <span>{out.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Mobile-friendly simplified version */
const PipelineMobile = () => {
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
    <div className="flex flex-row justify-center items-center relative z-10 mb-8 md:hidden">
      <div className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-2 glass text-white border border-white/5">
        <MessageSquare className="w-4 h-4 text-primary" />
        <span>Feedback</span>
      </div>
      <div className="w-6 h-[2px] bg-white/10 relative overflow-hidden">
        {(animState === 1 || animState === 2) && (
          <motion.div
            className="absolute inset-0 h-full"
            style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </div>
      <div className={`rounded-xl p-[1.5px] z-10 transition-all duration-500 ${animState === 2 ? "bg-gradient-primary" : ""}`}>
        <div className="flex items-center gap-1.5 text-sm font-semibold rounded-xl px-3 py-1.5 bg-card">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-gradient">Saramsa</span>
        </div>
      </div>
      <div className="w-6 h-[2px] bg-white/10 relative overflow-hidden">
        {(animState === 1 || animState === 2) && (
          <motion.div
            className="absolute inset-0 h-full"
            style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </div>
      <div className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-2 glass text-white border border-white/5">
        <CheckSquare className="w-4 h-4 text-primary" />
        <span>Actions</span>
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
    <div className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold overflow-hidden h-[1.3em]">
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

const Test1B = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Monter-style fine grid with radial mask */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
            maskImage: "radial-gradient(circle at center, black 8%, transparent 45%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 8%, transparent 45%)",
            opacity: 0.7,
            zIndex: 1,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={350} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40" delay={0.2} />
        <GlowOrb size={280} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-35" delay={0.5} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Pipeline animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <PipelineAnimation />
              <PipelineMobile />
            </motion.div>

            {/* Static line */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold text-foreground mb-2 leading-tight tracking-tight"
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
              Aggregate feedback from reviews, surveys, Slack, and support tickets.
              Saramsa.ai turns it all into a prioritized roadmap — automatically.
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

export default Test1B;
