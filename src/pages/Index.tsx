import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { Brain, MessageSquare, BarChart3, Zap, GitBranch, TrendingUp, Cloud, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Pipeline Animation Icons
   ────────────────────────────────────────── */

const FeedbackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
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
    <rect x="4" y="3" width="18" height="13" rx="4" fill="url(#fg2)" />
    <rect x="8" y="8" width="20" height="14" rx="4" fill="url(#fg1)" />
    <path d="M12 22l-2 5 6-5" fill="url(#fg1)" />
    <circle cx="14.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="18" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="21.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
  </svg>
);

const ActionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
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
    <circle cx="16" cy="17" r="12" stroke="url(#ag1)" strokeWidth="2" fill="none" />
    <circle cx="16" cy="17" r="7.5" stroke="url(#ag1)" strokeWidth="1.8" fill="url(#ag2)" />
    <circle cx="16" cy="17" r="3" fill="url(#ag1)" />
    <line x1="16" y1="17" x2="27" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 3h6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* ──────────────────────────────────────────
   Pipeline Animation
   ────────────────────────────────────────── */

const PipelineAnimation = () => {
  const [animState, setAnimState] = useState(0);

  // States: 0=idle, 1=left line flows, 2=saramsa glows (left stays), 3=right line flows (all stay), 4=all lit, 5=fade out
  useEffect(() => {
    const cycle = () => {
      setAnimState(1);
      setTimeout(() => setAnimState(2), 2000);   // left done → saramsa glows
      setTimeout(() => setAnimState(3), 3600);   // saramsa done → right flows
      setTimeout(() => setAnimState(4), 5600);   // right done → all lit
      setTimeout(() => setAnimState(5), 6800);   // hold → fade out
      setTimeout(() => setAnimState(0), 7600);   // reset
    };
    cycle();
    const interval = setInterval(cycle, 8500);
    return () => clearInterval(interval);
  }, []);

  const leftOn = animState >= 1 && animState <= 4;
  const leftFlowing = animState === 1;
  const glowOn = animState >= 2 && animState <= 4;
  const rightOn = animState >= 3 && animState <= 4;
  const rightFlowing = animState === 3;
  const fading = animState === 5 || animState === 0;

  return (
    <div className="flex flex-row justify-center items-center relative z-10">
      {/* Left badge: Feedback */}
      <motion.div
        animate={{ scale: leftFlowing ? [1, 1.04, 1] : 1 }}
        transition={{ duration: 1.6, repeat: leftFlowing ? Infinity : 0 }}
        className="relative flex items-center gap-2 text-xs md:text-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 z-10 border border-white/[0.08] shadow-lg"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06]"
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <FeedbackIcon />
        </div>
        <span className="font-medium text-foreground tracking-wide hidden sm:inline">Feedback</span>
      </motion.div>

      {/* Left connecting line */}
      <div className="w-6 md:w-10 lg:w-16 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full self-center mx-1">
        {/* Gradient fill — flows in left→right, stays, then hides instantly on reset */}
        <motion.div
          className="absolute inset-0 h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
          animate={
            fading
              ? { opacity: 0, x: "0%" }
              : leftOn
              ? { x: "0%", opacity: 1 }
              : { x: "-100%", opacity: 0 }
          }
          initial={{ x: "-100%", opacity: 0 }}
          transition={
            fading
              ? { opacity: { duration: 0.5 }, x: { duration: 0 } }
              : leftFlowing
              ? { duration: 1.8, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
        {/* Traveling particle — only during flow */}
        {leftFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-primary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-primary-rgb),0.6), 0 0 20px rgba(var(--color-primary-rgb),0.3)",
            }}
            animate={{ left: ["-8%", "105%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.15 }}
          />
        )}
      </div>

      {/* Center: Saramsa */}
      <div className="relative z-10">
        {/* Soft glow behind */}
        <motion.div
          className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-secondary-rgb),0.2) 50%, transparent 80%)" }}
          animate={glowOn ? { opacity: [0, 0.7, 0.4, 0.7], scale: [0.95, 1.05, 1, 1.05] } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.0, repeat: glowOn ? Infinity : 0, ease: "easeInOut" }}
        />
        {/* Card with gradient border */}
        <motion.div
          animate={glowOn ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 1.6, repeat: glowOn ? Infinity : 0, ease: "easeInOut" }}
          className="relative rounded-2xl p-[1.5px]"
          style={{
            background: glowOn
              ? "linear-gradient(135deg, var(--color-primary-hex), var(--color-secondary-hex))"
              : "rgba(255,255,255,0.08)",
            transition: "background 0.6s ease",
          }}
        >
          <div className="flex items-center gap-2 rounded-xl px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5" style={{ background: "hsl(var(--card))" }}>
            <img src="/logo-white.svg" alt="Saramsa" className="h-5 sm:h-6 md:h-7 w-auto object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Right connecting line */}
      <div className="w-6 md:w-10 lg:w-16 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full self-center mx-1">
        {/* Gradient fill — flows in left→right, stays, then hides instantly on reset */}
        <motion.div
          className="absolute inset-0 h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
          animate={
            fading
              ? { opacity: 0, x: "0%" }
              : rightOn
              ? { x: "0%", opacity: 1 }
              : { x: "-100%", opacity: 0 }
          }
          initial={{ x: "-100%", opacity: 0 }}
          transition={
            fading
              ? { opacity: { duration: 0.5 }, x: { duration: 0 } }
              : rightFlowing
              ? { duration: 1.8, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
        {/* Traveling particle — only during flow */}
        {rightFlowing && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--color-secondary-hex), transparent)",
              boxShadow: "0 0 10px rgba(var(--color-secondary-rgb),0.6), 0 0 20px rgba(var(--color-secondary-rgb),0.3)",
            }}
            animate={{ left: ["-8%", "105%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.15 }}
          />
        )}
      </div>

      {/* Right badge: Action Items */}
      <motion.div
        animate={{ scale: rightFlowing ? [1, 1.04, 1] : 1 }}
        transition={{ duration: 1.6, repeat: rightFlowing ? Infinity : 0 }}
        className="relative flex items-center gap-2 text-xs md:text-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 z-10 border border-white/[0.08] shadow-lg"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06]"
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <ActionIcon />
        </div>
        <span className="font-medium text-foreground tracking-wide hidden sm:inline">Action Items</span>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────
   Rotating Text — whole word floats up
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
    }, 2800);
    return () => clearInterval(interval);
  }, [phrases]);

  const longest = phrases.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className="inline-grid text-left">
      {/* Row 1, Col 1: invisible longest phrase locks the width */}
      <span className="invisible whitespace-nowrap col-start-1 row-start-1">{longest}</span>
      {/* Row 1, Col 1: animated text stacks on top */}
      <span className="col-start-1 row-start-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="inline-block text-gradient whitespace-nowrap"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

/* ── Custom Pipeline Icons ── */

/** Sentiment bubbles — happy + sad face in speech bubbles */
const SentimentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="si1" x1="2" y1="2" x2="30" y2="30">
        <stop stopColor="var(--color-primary-hex)" />
        <stop offset="1" stopColor="var(--color-secondary-hex)" />
      </linearGradient>
    </defs>
    {/* Positive bubble */}
    <rect x="2" y="2" width="16" height="13" rx="4" fill="url(#si1)" fillOpacity="0.25" />
    <path d="M6 10c0 0 2.5 3 6 0" stroke="url(#si1)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="7" cy="7.5" r="1" fill="url(#si1)" />
    <circle cx="13" cy="7.5" r="1" fill="url(#si1)" />
    {/* Negative bubble */}
    <rect x="14" y="14" width="16" height="13" rx="4" fill="url(#si1)" fillOpacity="0.5" />
    <path d="M20 24c0 0 2.5-3 6 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="21" cy="20.5" r="1" fill="white" fillOpacity="0.8" />
    <circle cx="27" cy="20.5" r="1" fill="white" fillOpacity="0.8" />
    {/* Tail */}
    <path d="M5 15l-2 4 5-4" fill="url(#si1)" fillOpacity="0.25" />
  </svg>
);

/** Bar chart with upward arrow — data-driven */
const DataDecisionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="dd1" x1="2" y1="28" x2="30" y2="4">
        <stop stopColor="var(--color-primary-hex)" />
        <stop offset="1" stopColor="var(--color-secondary-hex)" />
      </linearGradient>
    </defs>
    {/* Bars */}
    <rect x="3" y="18" width="5" height="10" rx="1.5" fill="url(#dd1)" fillOpacity="0.3" />
    <rect x="10" y="13" width="5" height="15" rx="1.5" fill="url(#dd1)" fillOpacity="0.5" />
    <rect x="17" y="8" width="5" height="20" rx="1.5" fill="url(#dd1)" fillOpacity="0.7" />
    <rect x="24" y="4" width="5" height="24" rx="1.5" fill="url(#dd1)" />
    {/* Trend arrow */}
    <path d="M5 17L14 11L20 14L28 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M24 4L29 4L29 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/** Document with pen — user story creation */
const StoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="us1" x1="4" y1="2" x2="28" y2="30">
        <stop stopColor="var(--color-primary-hex)" />
        <stop offset="1" stopColor="var(--color-secondary-hex)" />
      </linearGradient>
    </defs>
    {/* Document */}
    <rect x="4" y="2" width="18" height="28" rx="3" fill="url(#us1)" fillOpacity="0.2" />
    <rect x="4" y="2" width="18" height="28" rx="3" stroke="url(#us1)" strokeWidth="1.5" fill="none" />
    {/* Text lines */}
    <rect x="8" y="8" width="10" height="1.5" rx="0.75" fill="url(#us1)" fillOpacity="0.6" />
    <rect x="8" y="13" width="8" height="1.5" rx="0.75" fill="url(#us1)" fillOpacity="0.4" />
    <rect x="8" y="18" width="10" height="1.5" rx="0.75" fill="url(#us1)" fillOpacity="0.6" />
    <rect x="8" y="23" width="6" height="1.5" rx="0.75" fill="url(#us1)" fillOpacity="0.4" />
    {/* Pen */}
    <path d="M24 10l4-4 2 2-4 4-2.5.5z" fill="url(#us1)" />
    <path d="M24 10l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Stacked cards with arrows — prioritisation */
const PriorityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="pr1" x1="2" y1="2" x2="30" y2="30">
        <stop stopColor="var(--color-primary-hex)" />
        <stop offset="1" stopColor="var(--color-secondary-hex)" />
      </linearGradient>
    </defs>
    {/* Card 1 — top priority */}
    <rect x="4" y="3" width="20" height="7" rx="2" fill="url(#pr1)" />
    <rect x="7" y="5.5" width="6" height="2" rx="1" fill="white" fillOpacity="0.8" />
    {/* Card 2 */}
    <rect x="4" y="13" width="20" height="7" rx="2" fill="url(#pr1)" fillOpacity="0.5" />
    <rect x="7" y="15.5" width="8" height="2" rx="1" fill="white" fillOpacity="0.5" />
    {/* Card 3 */}
    <rect x="4" y="23" width="20" height="7" rx="2" fill="url(#pr1)" fillOpacity="0.25" />
    <rect x="7" y="25.5" width="5" height="2" rx="1" fill="white" fillOpacity="0.3" />
    {/* Up arrow */}
    <path d="M27 24V8" stroke="url(#pr1)" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 11l3-3 3 3" stroke="url(#pr1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/** Connected gears — DevOps integration */
const DevOpsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="dv1" x1="2" y1="2" x2="30" y2="30">
        <stop stopColor="var(--color-primary-hex)" />
        <stop offset="1" stopColor="var(--color-secondary-hex)" />
      </linearGradient>
    </defs>
    {/* Infinity / loop */}
    <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="url(#dv1)" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M22 16c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6" stroke="url(#dv1)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
    {/* Gear left */}
    <circle cx="10" cy="16" r="4" fill="url(#dv1)" fillOpacity="0.3" />
    <circle cx="10" cy="16" r="2" fill="url(#dv1)" />
    {/* Gear right */}
    <circle cx="22" cy="16" r="4" fill="url(#dv1)" fillOpacity="0.3" />
    <circle cx="22" cy="16" r="2" fill="url(#dv1)" />
    {/* Arrow flow */}
    <path d="M3 16h3" stroke="url(#dv1)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M26 16h3" stroke="url(#dv1)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M27 14l2 2-2 2" stroke="url(#dv1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const pipelineSteps = [
  { label: "Feedback / Sentiment Analysis", icon: SentimentIcon },
  { label: "Data Driven Decisions", icon: DataDecisionIcon },
  { label: "User Story Creation", icon: StoryIcon },
  { label: "Action Prioritisation", icon: PriorityIcon },
  { label: "Integration to DevOps", icon: DevOpsIcon },
];

const platformFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    subtitle: "Understand every voice",
    description: "Advanced AI algorithms analyze sentiment, trends, and patterns in customer feedback — surfacing what matters without manual effort.",
    visual: "sentiment",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    subtitle: "From noise to clarity",
    description: "Raw feedback becomes clear, prioritized recommendations that drive real product and service improvements.",
    visual: "chart",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Integration",
    subtitle: "Every source, one view",
    description: "Slack channels and file uploads flow into one unified feedback stream — automatically ingested and analyzed.",
    visual: "channels",
  },
  {
    icon: GitBranch,
    title: "Connected Workflows",
    subtitle: "Fits where you work",
    description: "User stories and work items flow directly into Jira and Azure DevOps. No copy-paste, no context switching.",
    visual: "workflow",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    subtitle: "Insights in seconds",
    description: "Feedback is analyzed the moment it arrives. No batching, no waiting — your dashboard is always current.",
    visual: "realtime",
  },
  {
    icon: TrendingUp,
    title: "Trend Detection",
    subtitle: "See what's emerging",
    description: "Automatically surface rising themes, shifting sentiment, and emerging patterns before they become problems.",
    visual: "trend",
  },
];

/* ── Feature Showcase: Interactive left-right explorer ── */

const FeatureVisual = ({ type }: { type: string }) => {
  const visuals: Record<string, React.ReactNode> = {
    sentiment: (
      <div className="flex items-end gap-3 h-full px-6 pb-2">
        {[
          { label: "Positive", pct: 72 },
          { label: "Neutral", pct: 45 },
          { label: "Negative", pct: 20 },
        ].map((bar, i) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              className="w-full rounded-md"
              style={{ background: "linear-gradient(180deg, var(--color-primary-hex), var(--color-secondary-hex))", opacity: 0.9 - i * 0.25 }}
              initial={{ height: 0 }}
              whileInView={{ height: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            />
            <span className="text-[8px] text-muted-foreground/60">{bar.label}</span>
          </div>
        ))}
      </div>
    ),
    chart: (
      <svg className="w-full h-full p-3" viewBox="0 0 140 80" fill="none">
        <motion.path
          d="M8 60 L25 52 L42 56 L58 38 L75 42 L92 24 L108 28 L132 12"
          stroke="var(--color-primary-hex)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <path
          d="M8 60 L25 52 L42 56 L58 38 L75 42 L92 24 L108 28 L132 12 L132 80 L8 80 Z"
          fill="url(#areaGrad)"
        />
        <defs>
          <linearGradient id="areaGrad" x1="70" y1="0" x2="70" y2="80">
            <stop stopColor="var(--color-primary-hex)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--color-primary-hex)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
    channels: (
      <div className="flex flex-wrap gap-1.5 items-center justify-center h-full px-4">
        {["Slack", "File Upload", "Jira", "Azure DevOps"].map((ch, i) => (
          <motion.span
            key={ch}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="px-2.5 py-1 rounded-md text-[10px] font-medium text-foreground/50 border border-white/[0.06]"
            style={{ background: "rgba(var(--color-primary-rgb),0.05)" }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
    ),
    workflow: (
      <div className="flex items-center justify-center gap-2 h-full px-3">
        {["Insight", "Task", "Sprint"].map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && (
              <motion.div
                className="w-5 h-[1.5px] rounded-full"
                style={{ background: "var(--gradient-primary)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.2 }}
              />
            )}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-foreground/60 border border-white/[0.06]"
              style={{ background: "rgba(var(--color-primary-rgb),0.05)" }}
            >
              {item}
            </motion.span>
          </React.Fragment>
        ))}
      </div>
    ),
    realtime: (
      <div className="flex items-center justify-center h-full">
        <motion.span
          className="text-3xl font-bold text-gradient"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          Real-Time
        </motion.span>
      </div>
    ),
    trend: (
      <div className="flex items-center gap-2 justify-center h-full px-3">
        {[
          { label: "UX", delta: "+24%", up: true },
          { label: "Price", delta: "+18%", up: true },
          { label: "Bugs", delta: "-12%", up: false },
        ].map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg border border-white/[0.06]"
            style={{ background: "rgba(var(--color-primary-rgb),0.04)" }}
          >
            <span className="text-[9px] text-muted-foreground/50">{t.label}</span>
            <span className={`text-xs font-bold ${t.up ? "text-green-400/80" : "text-red-400/80"}`}>{t.delta}</span>
          </motion.div>
        ))}
      </div>
    ),
  };
  return <>{visuals[type] || null}</>;
};

const FeatureShowcase = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {platformFeatures.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group relative rounded-2xl glass-card overflow-hidden"
        >
          {/* Gradient top line — always subtle, brighter on hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "var(--gradient-primary)" }}
          />

          {/* Visual area — unique per card */}
          <div className="h-28 md:h-32 relative overflow-hidden bg-white/[0.01] border-b border-white/[0.04] flex items-center justify-center">
            {/* Subtle hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(circle at 50% 80%, rgba(var(--color-primary-rgb),0.08), transparent 70%)" }}
            />
            <FeatureVisual type={feature.visual} />
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/[0.06] group-hover:border-primary/20 transition-colors duration-300"
                style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.1), rgba(var(--color-secondary-rgb),0.06))" }}
              >
                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground">{feature.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const demoFeatures = [
  { icon: MessageSquare, title: "Feedback Collection", description: "Aggregate feedback from Slack channels and file uploads" },
  { icon: BarChart3, title: "AI Analysis", description: "Categorize, tag, and analyze sentiment automatically" },
  { icon: Cloud, title: "Themes & Keywords", description: "Surface top themes, aspects, and keyword clouds at a glance" },
  { icon: TrendingUp, title: "Trend Detection", description: "Track historical patterns and emerging opportunities" },
  { icon: ClipboardCheck, title: "User Story Review", description: "Review and refine AI-generated user stories before shipping" },
];

const sampleFeedback = [
  { sentiment: "positive", text: "The new checkout process is so much faster!", category: "UX", score: 0.92 },
  { sentiment: "negative", text: "App keeps crashing on Android 14", category: "Bug", score: 0.15 },
  { sentiment: "positive", text: "Customer support was incredibly helpful", category: "Support", score: 0.88 },
  { sentiment: "neutral", text: "Would be nice to have more payment options", category: "Feature Request", score: 0.55 },
  { sentiment: "positive", text: "Finally a tool that understands our needs!", category: "General", score: 0.95 },
];

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
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
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={200} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40 md:hidden" delay={0.2} />
        <GlowOrb size={150} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-35 md:hidden" delay={0.5} />
        <GlowOrb size={350} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40 hidden md:block" delay={0.2} />
        <GlowOrb size={280} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-35 hidden md:block" delay={0.5} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* 1. Badge — small contextual label first */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full glass border border-primary/20 text-[10px] md:text-xs lg:text-sm text-primary font-medium mb-8 md:mb-10 shimmer"
            >
              <Zap className="w-3.5 h-3.5" />
              Enterprise-Grade Product Management Agent
            </motion.div>

            {/* 2. Pipeline animation — visual hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 md:mb-10 lg:mb-12"
            >
              <PipelineAnimation />
            </motion.div>

            {/* 3. Heading — single line */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-foreground mb-6 md:mb-8 leading-normal tracking-tight"
            >
              <RotatingText />{" "}
              <span className="text-foreground">to Roadmap in Seconds</span>
            </motion.h1>

            {/* 4. Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base lg:text-lg text-muted-foreground mb-10 md:mb-12 max-w-md md:max-w-xl mx-auto px-4 md:px-0 leading-relaxed italic font-light"
            >
              Turn messy feedback into prioritized features and build-ready user stories with Saramsa.ai
            </motion.p>

            {/* 5. CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="hero" size="default" className="h-10 px-6 text-sm md:h-12 md:px-8 md:text-base lg:h-14 lg:px-10 lg:text-lg rounded-lg md:rounded-lg lg:rounded-xl" asChild>
                <Link to="/about#contact">
                  Book a demo
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
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

      {/* Pipeline Steps Section */}
      <section id="features" className="pt-14 pb-4 md:pt-20 md:pb-6 lg:pt-28 lg:pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
            maskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            opacity: 0.4,
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
        <GlowOrb size={250} className="top-[10%] right-[10%] opacity-30 hidden md:block" delay={0.3} />
        <GlowOrb size={200} className="bottom-[15%] left-[5%] opacity-25 hidden md:block" delay={0.6} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="inline-block px-5 py-2 rounded-full glass text-base md:text-lg text-primary font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Feedback to Action,{" "}
              <span className="text-gradient">End to End</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base lg:text-lg italic font-light">
              From raw input to build-ready stories — Saramsa handles the entire pipeline.
            </p>
          </motion.div>

          {/* Flowing Pipeline — diagonal zigzag */}
          <div className="relative max-w-5xl mx-auto mb-14 md:mb-20 lg:mb-28">

            {/* ── Desktop: Zigzag diagonal flow with SVG path ── */}
            <div className="hidden lg:block relative" style={{ minHeight: 340 }}>
              {/* SVG flowing path */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 900 340"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary-hex)" />
                    <stop offset="100%" stopColor="var(--color-secondary-hex)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 90 55 Q 250 55, 270 115 Q 290 175, 450 165 Q 610 155, 630 215 Q 650 275, 810 275"
                  stroke="url(#pathGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              {/* Steps along the diagonal */}
              <div className="grid grid-cols-5 gap-4 relative z-10">
                {pipelineSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 25, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.18, duration: 0.5 }}
                    className="flex flex-col items-center text-center group"
                    style={{ marginTop: index * 56 }}
                  >
                    {/* Icon node — glass card */}
                    <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center glass-card border border-white/[0.08] group-hover:border-primary/30 transition-all duration-300 mb-3"
                      style={{
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.15), rgba(var(--color-secondary-rgb),0.1))",
                        }}
                      >
                        <step.icon />
                      </div>
                    </div>

                    {/* Label */}
                    <p className="text-xs font-medium text-foreground/80 leading-snug max-w-[120px]">
                      {step.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Tablet: Horizontal compact ── */}
            <div className="hidden md:block lg:hidden relative">
              <div className="grid grid-cols-5 gap-3 relative z-10">
                {pipelineSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
                    className="flex flex-col items-center text-center group"
                    style={{ marginTop: index * 28 }}
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center glass-card border border-white/[0.08] group-hover:border-primary/30 transition-all duration-300 mb-2">
                      <step.icon />
                    </div>
                    <p className="text-[10px] font-medium text-foreground/80 leading-snug max-w-[100px]">
                      {step.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Mobile: Vertical timeline ── */}
            <div className="md:hidden relative pl-10">
              <motion.div
                className="absolute left-[14px] top-0 bottom-0 w-[2px] rounded-full"
                style={{ background: "linear-gradient(180deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
                initial={{ scaleY: 0, transformOrigin: "top" }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />

              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.12 }}
                  className="flex items-center gap-4 py-4 relative"
                >
                  <div
                    className="absolute left-[-32px] w-3.5 h-3.5 rounded-full border-2 border-background"
                    style={{
                      background: "var(--gradient-primary)",
                      boxShadow: "0 0 8px rgba(var(--color-primary-rgb),0.4)",
                    }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08]"
                    style={{
                      background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
                    }}
                  >
                    <step.icon />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 leading-snug">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Platform — Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block px-5 py-2 rounded-full glass text-base md:text-lg text-primary font-medium mb-4">
              Platform
            </span>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base lg:text-lg italic font-light leading-relaxed">
              An AI partner that turns complex feedback into ready-to-build stories, so you can stop chasing requirements and start shipping faster.
            </p>
          </motion.div>

          {/* Interactive Feature Showcase */}
          <FeatureShowcase />
        </div>
      </section>

      {/* Demo Section — hidden, flip the `false &&` guard below to re-enable */}
      {false && (
      <section id="demo" className="pt-14 pb-4 md:pt-20 md:pb-6 lg:pt-28 lg:pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
            maskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            opacity: 0.4,
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
        <GlowOrb size={280} className="top-[5%] left-[8%] opacity-25 hidden md:block" delay={0.4} />
        <GlowOrb size={220} className="bottom-[10%] right-[12%] opacity-30 hidden md:block" delay={0.7} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="inline-block px-5 py-2 rounded-full glass text-base md:text-lg text-primary font-medium mb-4">
              Interactive Demo
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Experience <span className="text-gradient">Saramsa.ai</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base lg:text-lg italic font-light">
              See how our AI transforms customer feedback into actionable insights in real-time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Feature selector */}
            <div className="lg:col-span-1 space-y-2">
              {demoFeatures.map((feature, index) => (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-3 md:p-4 rounded-xl transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-card/90 border border-primary/40 shadow-[0_0_20px_-6px_rgba(var(--color-primary-rgb),0.3)]"
                      : "glass hover:bg-card/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                      activeFeature === index ? "bg-primary/20 border border-primary/30" : "bg-secondary/60"
                    }`}>
                      <feature.icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                        activeFeature === index ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-xs md:text-sm">{feature.title}</h4>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Dashboard mock */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-border/50 bg-card/40">
                <h3 className="text-xs md:text-sm font-semibold text-foreground">Feedback Dashboard</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/50" />
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              <div className="p-4 md:p-5 lg:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-5">
                  {[
                    { label: "Total Feedback", value: "12,847" },
                    { label: "Positive", value: "67%" },
                    { label: "Issues Found", value: "23" },
                    { label: "Avg. Score", value: "4.2" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background/40 border border-border/40 rounded-xl p-2.5 md:p-3.5 text-center">
                      <div className="text-base md:text-xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  {sampleFeedback.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-background/30 border border-border/30 rounded-xl p-2.5 md:p-3.5 flex items-center justify-between gap-2 md:gap-4 hover:border-border/60 transition-colors"
                    >
                      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                        <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${
                          item.sentiment === "positive" ? "bg-green-500" : item.sentiment === "negative" ? "bg-destructive" : "bg-yellow-500"
                        }`} />
                        <p className="text-xs md:text-sm text-foreground truncate">{item.text}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <span className="text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg bg-primary/10 text-primary font-medium">{item.category}</span>
                        <span className="text-xs md:text-sm font-medium text-muted-foreground w-8 md:w-12 text-right">{Math.round(item.score * 100)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="pt-14 pb-14 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
            maskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 5%, transparent 40%)",
            opacity: 0.35,
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <GlowOrb size={300} className="top-1/2 left-[15%] -translate-y-1/2 opacity-25 hidden md:block" delay={0.5} />
        <GlowOrb size={250} className="top-1/3 right-[10%] opacity-20 hidden md:block" delay={0.8} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated aurora background */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute w-[500px] h-[500px] rounded-full blur-[100px] -top-40 -left-20"
                  style={{ background: "rgba(var(--color-primary-rgb),0.15)" }}
                  animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-[400px] h-[400px] rounded-full blur-[100px] -bottom-32 -right-10"
                  style={{ background: "rgba(var(--color-secondary-rgb),0.12)" }}
                  animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-[300px] h-[300px] rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ background: "rgba(var(--color-primary-rgb),0.08)" }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Gradient border */}
              <div className="absolute inset-0 rounded-3xl p-[1px]" style={{ background: "var(--gradient-primary)", opacity: 0.4 }}>
                <div className="w-full h-full rounded-3xl bg-card" />
              </div>

              {/* Content */}
              <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  {/* Left: Text + CTAs */}
                  <div className="lg:col-span-3 text-center lg:text-left">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-xs md:text-sm text-primary font-medium uppercase tracking-widest mb-3"
                    >
                      Get Started Today
                    </motion.p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight leading-tight">
                      Ready to{" "}
                      <span className="text-gradient">Transform</span> Your
                      <br className="hidden md:block" /> Customer Insights?
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed italic font-light">
                      Stop drowning in unstructured feedback. Start shipping what your customers actually need.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                      <Button variant="hero" size="lg" className="md:h-12 md:px-8" asChild>
                        <Link to="/about#contact">
                          Book a Demo
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/pricing#plans">View Pricing</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right: Mini Dashboard Teaser */}
                  <div className="lg:col-span-2 hidden lg:block">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="rounded-xl border border-white/[0.06] overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
                    >
                      {/* Window bar */}
                      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04] bg-white/[0.02]">
                        <span className="text-[9px] font-medium text-foreground/50">Saramsa Dashboard</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-400/40" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                          <div className="w-2 h-2 rounded-full bg-green-400/40" />
                        </div>
                      </div>
                      {/* Mini stats */}
                      <div className="grid grid-cols-3 gap-1.5 p-2.5">
                        {[
                          { label: "Analyzed", val: "2,847" },
                          { label: "Positive", val: "68%" },
                          { label: "Stories", val: "34" },
                        ].map((s) => (
                          <div key={s.label} className="text-center py-1.5 rounded-lg border border-white/[0.04]" style={{ background: "rgba(var(--color-primary-rgb),0.03)" }}>
                            <div className="text-sm font-bold text-gradient">{s.val}</div>
                            <div className="text-[7px] text-muted-foreground/50">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      {/* Feedback rows */}
                      <div className="px-2.5 pb-2.5 space-y-1">
                        {[
                          { sentiment: "bg-green-400", text: "Love the new checkout!", tag: "UX" },
                          { sentiment: "bg-red-400", text: "App crashes on Android 14", tag: "Bug" },
                          { sentiment: "bg-yellow-400", text: "Need more payment options", tag: "Feature" },
                        ].map((row, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-white/[0.03]"
                            style={{ background: "rgba(255,255,255,0.01)" }}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${row.sentiment} shrink-0`} />
                            <span className="text-[9px] text-foreground/50 flex-1 truncate">{row.text}</span>
                            <span className="text-[7px] px-1.5 py-0.5 rounded bg-primary/8 text-primary/60 font-medium shrink-0">{row.tag}</span>
                          </motion.div>
                        ))}
                      </div>
                      {/* Generated badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="mx-2.5 mb-2.5 flex items-center gap-2 px-2.5 py-2 rounded-lg"
                        style={{ background: "rgba(var(--color-primary-rgb),0.08)", border: "1px solid rgba(var(--color-primary-rgb),0.15)" }}
                      >
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[9px] font-medium text-primary/80">3 user stories generated</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
