import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Custom SVG Icons — polished, gradient-filled
   ────────────────────────────────────────── */

/** Stacked speech bubbles — "many voices" */
const FeedbackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="fg1" x1="2" y1="4" x2="30" y2="28">
        <stop stopColor="#FF8921" />
        <stop offset="1" stopColor="#FF2F4B" />
      </linearGradient>
      <linearGradient id="fg2" x1="6" y1="2" x2="26" y2="22">
        <stop stopColor="#FF8921" stopOpacity="0.5" />
        <stop offset="1" stopColor="#FF2F4B" stopOpacity="0.35" />
      </linearGradient>
    </defs>
    {/* Back bubble */}
    <rect x="4" y="3" width="18" height="13" rx="4" fill="url(#fg2)" />
    {/* Front bubble */}
    <rect x="8" y="8" width="20" height="14" rx="4" fill="url(#fg1)" />
    {/* Tail */}
    <path d="M12 22l-2 5 6-5" fill="url(#fg1)" />
    {/* Typing dots */}
    <circle cx="14.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="18" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="21.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
  </svg>
);

/** Target with arrow — "goals hit" */
const ActionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="ag1" x1="2" y1="2" x2="30" y2="30">
        <stop stopColor="#FF8921" />
        <stop offset="1" stopColor="#FF2F4B" />
      </linearGradient>
      <linearGradient id="ag2" x1="4" y1="4" x2="28" y2="28">
        <stop stopColor="#FF8921" stopOpacity="0.3" />
        <stop offset="1" stopColor="#FF2F4B" stopOpacity="0.18" />
      </linearGradient>
    </defs>
    {/* Outer ring */}
    <circle cx="16" cy="17" r="12" stroke="url(#ag1)" strokeWidth="2" fill="none" />
    {/* Middle ring */}
    <circle cx="16" cy="17" r="7.5" stroke="url(#ag1)" strokeWidth="1.8" fill="url(#ag2)" />
    {/* Bullseye */}
    <circle cx="16" cy="17" r="3" fill="url(#ag1)" />
    {/* Arrow shaft */}
    <line x1="16" y1="17" x2="27" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Arrow head */}
    <path d="M24 3h6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* ──────────────────────────────────────────
   Pipeline Animation: "The Refinery" (enhanced)
   ────────────────────────────────────────── */

const PipelineAnimation = () => {
  const [animState, setAnimState] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setAnimState(1), 6500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animState === 1) {
      const t = setTimeout(() => setAnimState(2), 2200);
      return () => clearTimeout(t);
    }
    if (animState === 2) {
      const t = setTimeout(() => setAnimState(3), 2000);
      return () => clearTimeout(t);
    }
    if (animState === 3) {
      const t = setTimeout(() => setAnimState(0), 1300);
      return () => clearTimeout(t);
    }
  }, [animState]);

  const isFlowing = animState === 1 || animState === 2;
  const isGlowing = animState === 2;

  return (
    <div className="flex flex-row justify-center items-center relative z-10 mb-12">
      {/* ── Left badge: Feedback ── */}
      <motion.div
        animate={isGlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
        className="relative flex items-center gap-3 text-sm md:text-base rounded-2xl px-4 md:px-5 py-3 md:py-3.5 z-10 border border-white/[0.08] shadow-xl"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <FeedbackIcon />
        </div>
        <span className="font-medium text-foreground tracking-wide">Feedback</span>
      </motion.div>

      {/* ── Left connecting line ── */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {/* Gradient fill */}
        {isFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
        {/* Traveling particle */}
        {isFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-primary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-primary-rgb),0.6), 0 0 20px rgba(var(--color-primary-rgb),0.3)",
            }}
            animate={{ left: ["-8%", "100%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </div>

      {/* ── Center: Saramsa ── */}
      <div className="relative z-10">
        {/* Soft glow behind — only visible when active */}
        <motion.div
          className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-secondary-rgb),0.2) 50%, transparent 80%)",
          }}
          animate={
            isGlowing
              ? { opacity: [0, 0.8, 0.5, 0.8, 0], scale: [0.95, 1.05, 1, 1.05, 0.95] }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 3, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
        />

        {/* Card with gradient border */}
        <motion.div
          animate={isGlowing ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 2.5, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
          className="relative rounded-2xl p-[1.5px]"
          style={{
            background: isGlowing
              ? "linear-gradient(135deg, var(--color-primary-hex), var(--color-secondary-hex))"
              : "rgba(255,255,255,0.08)",
            transition: "background 0.8s ease",
          }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-5 md:px-7 py-3 md:py-3.5"
            style={{ background: "hsl(var(--card))" }}
          >
            <img
              src="/logo-white.svg"
              alt="Saramsa"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Right connecting line ── */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {/* Gradient fill */}
        {isFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--color-secondary-hex), var(--color-primary-hex))",
            }}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
        {/* Traveling particle */}
        {isFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-secondary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-secondary-rgb),0.6), 0 0 20px rgba(var(--color-secondary-rgb),0.3)",
            }}
            animate={{ right: ["-8%", "100%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </div>

      {/* ── Right badge: Action Items ── */}
      <motion.div
        animate={isGlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
        className="relative flex items-center gap-3 text-sm md:text-base rounded-2xl px-4 md:px-5 py-3 md:py-3.5 z-10 border border-white/[0.08] shadow-xl"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <ActionIcon />
        </div>
        <span className="font-medium text-foreground tracking-wide">Action Items</span>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────
   Character-by-Character Text Animation
   ────────────────────────────────────────── */

const RotatingText = () => {
  const phrases = useMemo(
    () => ["Raw Feedback", "Messy Reviews", "Support Tickets"],
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
    <span className="inline-flex overflow-hidden h-[1.2em]">
      <AnimatePresence mode="wait">
        <motion.span key={index} className="inline-flex">
          {phrases[index].split("").map((letter, i) => (
            <motion.span
              key={`${index}-${i}`}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.025,
              }}
              className="text-gradient"
              style={{ display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ──────────────────────────────────────────
   Page
   ────────────────────────────────────────── */

const Test1A = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
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
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* 1. Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs md:text-sm text-primary font-medium mb-10 shimmer"
            >
              <Zap className="w-3.5 h-3.5" />
              Enterprise-Grade Product Management Agent
            </motion.div>

            {/* 2. Pipeline animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <PipelineAnimation />
            </motion.div>

            {/* 3. Heading — single line with rotating text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-foreground mb-8 leading-[1.15] tracking-tight"
            >
              <RotatingText />{" "}
              <span className="text-foreground">to Roadmap in Seconds</span>
            </motion.h1>

            {/* 4. Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed italic font-light"
            >
              Turn messy feedback into prioritized features and build-ready user stories with Saramsa.ai
            </motion.p>

            {/* 5. CTA */}
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
