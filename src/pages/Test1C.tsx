import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  MessageSquare,
  Star,
  Bug,
  Lightbulb,
  Zap,
  CheckSquare,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Pipeline Animation: "The Transformation Bar"
   Chaotic feedback ═══gradient beam═══▸ Saramsa ═══gradient beam═══▸ Clean outputs
   ────────────────────────────────────────── */

const feedbackItems = [
  { icon: MessageSquare, text: "App crashes on Android", color: "text-red-400" },
  { icon: Star, text: "Love the new UI!", color: "text-green-400" },
  { icon: Bug, text: "Login takes too long", color: "text-yellow-400" },
  { icon: Lightbulb, text: "Need dark mode", color: "text-blue-400" },
];

const outputItems = [
  { icon: CheckSquare, text: "Fix: Android crash", priority: "P0" },
  { icon: FileText, text: "Story: Dark mode", priority: "P1" },
  { icon: TrendingUp, text: "Trend: UX positive", priority: "Insight" },
];

const PipelineAnimation = () => {
  const [phase, setPhase] = useState<"idle" | "absorb" | "process" | "emit">("idle");

  useEffect(() => {
    const cycle = () => {
      setPhase("absorb");
      setTimeout(() => setPhase("process"), 2000);
      setTimeout(() => setPhase("emit"), 3500);
      setTimeout(() => setPhase("idle"), 6000);
    };
    cycle();
    const interval = setInterval(cycle, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 relative">
      <div className="flex items-center justify-between gap-2 md:gap-0">
        {/* Left: floating feedback chips */}
        <div className="flex flex-col gap-1.5 w-[120px] md:w-[160px] shrink-0">
          {feedbackItems.map((item, i) => (
            <motion.div
              key={item.text}
              animate={
                phase === "absorb"
                  ? { x: [0, 8, 0], opacity: [0.5, 1, 0.3] }
                  : phase === "process"
                  ? { opacity: 0.2, x: 12 }
                  : { opacity: 0.7, x: 0 }
              }
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
              className="flex items-center gap-1.5 text-[10px] md:text-xs rounded-md px-2 py-1.5 glass border border-white/5"
            >
              <item.icon className={`w-3 h-3 shrink-0 ${item.color}`} />
              <span className="truncate text-muted-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Left beam */}
        <div className="flex-1 h-[3px] rounded-full bg-white/5 relative overflow-hidden mx-1 md:mx-3">
          <motion.div
            className="absolute inset-y-0 left-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, var(--color-primary-hex), var(--color-secondary-hex))",
            }}
            animate={
              phase === "absorb" || phase === "process"
                ? { width: "100%", opacity: 1 }
                : { width: "0%", opacity: 0 }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Particles flowing right */}
          {(phase === "absorb" || phase === "process") &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={`lp-${i}`}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "var(--color-primary-hex)",
                  boxShadow: "0 0 8px rgba(var(--color-primary-rgb),0.6)",
                }}
                animate={{ left: ["-5%", "105%"] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
        </div>

        {/* Center: Saramsa */}
        <motion.div
          animate={
            phase === "process"
              ? {
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 0px rgba(255,137,33,0)",
                    "0 0 35px rgba(255,137,33,0.5)",
                    "0 0 0px rgba(255,137,33,0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.2, repeat: phase === "process" ? Infinity : 0 }}
          className={`rounded-xl p-[1.5px] z-10 shrink-0 transition-all duration-500 ${
            phase === "process" || phase === "emit"
              ? "bg-gradient-primary"
              : "border border-white/10"
          }`}
        >
          <div className="flex items-center gap-2 text-base md:text-xl font-semibold tracking-tight rounded-xl px-4 md:px-5 py-2 md:py-2.5 bg-card">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-gradient">Saramsa</span>
          </div>
        </motion.div>

        {/* Right beam */}
        <div className="flex-1 h-[3px] rounded-full bg-white/5 relative overflow-hidden mx-1 md:mx-3">
          <motion.div
            className="absolute inset-y-0 left-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--color-secondary-hex), var(--color-primary-hex), transparent)",
            }}
            animate={
              phase === "emit"
                ? { width: "100%", opacity: 1 }
                : { width: "0%", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {/* Particles flowing right */}
          {phase === "emit" &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={`rp-${i}`}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "var(--color-secondary-hex)",
                  boxShadow: "0 0 8px rgba(var(--color-secondary-rgb),0.6)",
                }}
                animate={{ left: ["-5%", "105%"] }}
                transition={{
                  duration: 1,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
        </div>

        {/* Right: structured output chips */}
        <div className="flex flex-col gap-1.5 w-[120px] md:w-[160px] shrink-0">
          {outputItems.map((item, i) => (
            <motion.div
              key={item.text}
              animate={
                phase === "emit"
                  ? { opacity: 1, x: [12, 0] }
                  : { opacity: 0.2, x: 12 }
              }
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              className="flex items-center gap-1.5 text-[10px] md:text-xs rounded-md px-2 py-1.5 glass border border-white/5"
            >
              <item.icon className="w-3 h-3 shrink-0 text-primary" />
              <span className="truncate text-foreground">{item.text}</span>
              <span className="ml-auto text-[8px] md:text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-medium shrink-0">
                {item.priority}
              </span>
            </motion.div>
          ))}
        </div>
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

const Test1C = () => {
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
              transition={{ duration: 0.8 }}
              className="w-full"
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
              Watch messy, unstructured feedback flow through Saramsa.ai and
              emerge as categorized, prioritized action items — in real time.
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

export default Test1C;
