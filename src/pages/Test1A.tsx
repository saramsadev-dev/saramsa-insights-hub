import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import React from "react";
import { ArrowRight, Zap, Brain, BarChart3, MessageSquare, GitBranch, TrendingUp } from "lucide-react";
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

  // States: 0=idle, 1=left line flows, 2=saramsa glows, 3=right line flows, 4=pause
  useEffect(() => {
    const interval = setInterval(() => setAnimState(1), 11000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animState === 1) {
      const t = setTimeout(() => setAnimState(2), 2800);
      return () => clearTimeout(t);
    }
    if (animState === 2) {
      const t = setTimeout(() => setAnimState(3), 2500);
      return () => clearTimeout(t);
    }
    if (animState === 3) {
      const t = setTimeout(() => setAnimState(4), 2800);
      return () => clearTimeout(t);
    }
    if (animState === 4) {
      const t = setTimeout(() => setAnimState(0), 1500);
      return () => clearTimeout(t);
    }
  }, [animState]);

  const leftFlowing = animState === 1;
  const isGlowing = animState === 2;
  const rightFlowing = animState === 3;

  return (
    <div className="flex flex-row justify-center items-center relative z-10 mb-12">
      {/* Left badge: Feedback */}
      <motion.div
        animate={leftFlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: leftFlowing ? Infinity : 0 }}
        className="relative flex items-center gap-3 text-sm md:text-base rounded-2xl px-4 md:px-5 py-3 md:py-3.5 z-10 border border-white/[0.08] shadow-xl"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <FeedbackIcon />
        </div>
        <span className="font-medium text-foreground tracking-wide">Feedback</span>
      </motion.div>

      {/* Left connecting line — flows LEFT → RIGHT */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {leftFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        )}
        {leftFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-primary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-primary-rgb),0.6), 0 0 20px rgba(var(--color-primary-rgb),0.3)",
            }}
            animate={{ left: ["-8%", "105%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
          />
        )}
      </div>

      {/* Center: Saramsa */}
      <div className="relative z-10">
        <motion.div
          className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-secondary-rgb),0.2) 50%, transparent 80%)" }}
          animate={isGlowing ? { opacity: [0, 0.8, 0.5, 0.8, 0], scale: [0.95, 1.05, 1, 1.05, 0.95] } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.5, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
        />
        <motion.div
          animate={isGlowing ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
          className="relative rounded-2xl p-[1.5px]"
          style={{
            background: isGlowing || rightFlowing
              ? "linear-gradient(135deg, var(--color-primary-hex), var(--color-secondary-hex))"
              : "rgba(255,255,255,0.08)",
            transition: "background 0.8s ease",
          }}
        >
          <div className="flex items-center gap-3 rounded-2xl px-5 md:px-7 py-3 md:py-3.5" style={{ background: "hsl(var(--card))" }}>
            <img src="/logo-white.svg" alt="Saramsa" className="h-8 md:h-9 w-auto object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Right connecting line — flows LEFT → RIGHT (out from Saramsa) */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {rightFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        )}
        {rightFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-secondary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-secondary-rgb),0.6), 0 0 20px rgba(var(--color-secondary-rgb),0.3)",
            }}
            animate={{ left: ["-8%", "105%"] }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
          />
        )}
      </div>

      {/* Right badge: Action Items */}
      <motion.div
        animate={rightFlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: rightFlowing ? Infinity : 0 }}
        className="relative flex items-center gap-3 text-sm md:text-base rounded-2xl px-4 md:px-5 py-3 md:py-3.5 z-10 border border-white/[0.08] shadow-xl"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
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
    }, 3500);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <span
      className="inline-block overflow-hidden h-[1.2em] align-bottom text-left"
      style={{ minWidth: "8.5em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-gradient whitespace-nowrap"
        >
          {phrases[index]}
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

      {/* Platform — Bento Grid */}
      <section className="pt-14 pb-14 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Platform
            </span>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base lg:text-lg italic font-light leading-relaxed">
              An AI partner that turns complex feedback into ready-to-build stories, so you can stop chasing requirements and start shipping faster.
            </p>
          </motion.div>

          {/* Bento Grid — 6 columns on desktop, compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 auto-rows-auto">

            {/* Card 1 — AI-Powered Analysis — spans 4 cols + 2 rows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="group sm:col-span-2 lg:col-span-4 lg:row-span-2 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="p-4 md:p-5 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">AI-Powered Analysis</h3>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                  Our AI engine runs a full pipeline on every piece of feedback — from raw text to prioritized action items.
                </p>
                <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.04] p-2.5 overflow-hidden">
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: "Sentiment Analysis", desc: "Positive / Negative / Neutral" },
                      { label: "Aspect-Based Analysis", desc: "Feature-level breakdown" },
                      { label: "Intent Classification", desc: "Praise, Complaint, Suggestion" },
                      { label: "Keyword Extraction", desc: "Auto-detected themes" },
                      { label: "User Story Generation", desc: "Build-ready work items" },
                      { label: "Trend Detection", desc: "Emerging patterns & spikes" },
                    ].map((cap, i) => (
                      <motion.div
                        key={cap.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex items-start gap-1.5 px-2 py-1.5 rounded border border-white/[0.04] hover:border-primary/20 transition-colors"
                        style={{ background: "rgba(var(--color-primary-rgb),0.03)" }}
                      >
                        <div className="w-1 h-1 rounded-full mt-1 shrink-0" style={{ background: "var(--gradient-primary)" }} />
                        <div>
                          <span className="text-[9px] font-medium text-foreground/70 block leading-tight">{cap.label}</span>
                          <span className="text-[7px] text-muted-foreground/50 leading-tight">{cap.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Actionable Insights — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group lg:col-span-2 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="h-20 flex items-center justify-center bg-white/[0.01] border-b border-white/[0.04] overflow-hidden">
                <svg className="w-full h-full p-3" viewBox="0 0 140 80" fill="none">
                  <motion.path d="M8 60 L25 52 L42 56 L58 38 L75 42 L92 24 L108 28 L132 12" stroke="var(--color-primary-hex)" strokeWidth="2" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
                  <path d="M8 60 L25 52 L42 56 L58 38 L75 42 L92 24 L108 28 L132 12 L132 80 L8 80 Z" fill="url(#bentoArea)" />
                  <defs><linearGradient id="bentoArea" x1="70" y1="0" x2="70" y2="80"><stop stopColor="var(--color-primary-hex)" stopOpacity="0.15" /><stop offset="1" stopColor="var(--color-primary-hex)" stopOpacity="0" /></linearGradient></defs>
                </svg>
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-xs font-semibold text-foreground">Actionable Insights</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Clear recommendations that drive real improvements.</p>
              </div>
            </motion.div>

            {/* Card 3 — Multi-Channel — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="group lg:col-span-2 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="h-20 flex flex-wrap gap-1 items-center justify-center bg-white/[0.01] border-b border-white/[0.04] px-3">
                {["Slack", "Jira", "Zendesk", "G2", "Email", "Surveys"].map((ch, i) => (
                  <motion.span key={ch} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="px-2 py-0.5 rounded text-[9px] font-medium text-foreground/50 border border-white/[0.06]" style={{ background: "rgba(var(--color-primary-rgb),0.05)" }}>
                    {ch}
                  </motion.span>
                ))}
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-xs font-semibold text-foreground">Multi-Channel</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Every source in one unified platform.</p>
              </div>
            </motion.div>

            {/* Card 4 — Connected Workflows — 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group lg:col-span-3 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="h-16 flex items-center justify-center gap-2 bg-white/[0.01] border-b border-white/[0.04] px-3">
                {["Insight", "Task", "Sprint"].map((item, i) => (
                  <React.Fragment key={item}>
                    {i > 0 && <motion.div className="w-5 h-[1.5px] rounded-full" style={{ background: "var(--gradient-primary)" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} />}
                    <motion.span initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                      className="px-2 py-1 rounded text-[9px] font-medium text-foreground/60 border border-white/[0.06]" style={{ background: "rgba(var(--color-primary-rgb),0.05)" }}>{item}</motion.span>
                  </React.Fragment>
                ))}
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <GitBranch className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-xs font-semibold text-foreground">Connected Workflows</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Insights flow into Jira, Azure DevOps, Asana, and Slack.</p>
              </div>
            </motion.div>

            {/* Card 5 — Real-Time — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="group lg:col-span-2 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="h-16 flex items-center justify-center bg-white/[0.01] border-b border-white/[0.04]">
                <motion.span className="text-2xl font-bold text-gradient" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", duration: 0.6 }}>&lt;2s</motion.span>
              </div>
              <div className="p-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="text-xs font-semibold text-foreground">Real-Time Processing</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Instant insights — no batching, no delays.</p>
              </div>
            </motion.div>

            {/* Card 6 — Trend Detection — 1 col */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group lg:col-span-1 rounded-xl glass-card overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }} />
              <div className="h-16 flex flex-col items-center justify-center gap-1 bg-white/[0.01] border-b border-white/[0.04] px-2">
                {[{ label: "UX", delta: "+24%" }, { label: "Bugs", delta: "-12%" }].map((t, i) => (
                  <motion.div key={t.label} initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between w-full px-2 py-0.5 rounded text-[8px] border border-white/[0.04]" style={{ background: "rgba(var(--color-primary-rgb),0.03)" }}>
                    <span className="text-muted-foreground/50">{t.label}</span>
                    <span className={`font-bold ${t.delta.startsWith("+") ? "text-green-400/70" : "text-red-400/70"}`}>{t.delta}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}>
                    <TrendingUp className="w-3 h-3 text-primary" />
                  </div>
                  <h3 className="text-[10px] font-semibold text-foreground">Trends</h3>
                </div>
                <p className="text-[9px] text-muted-foreground leading-relaxed">Surface emerging patterns.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Test1A;
