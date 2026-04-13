import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Brain, MessageSquare, BarChart3, Zap, GitBranch, Play, TrendingUp, Filter, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

/* ──────────────────────────────────────────
   Pipeline Animation Icons
   ────────────────────────────────────────── */

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
    <rect x="4" y="3" width="18" height="13" rx="4" fill="url(#fg2)" />
    <rect x="8" y="8" width="20" height="14" rx="4" fill="url(#fg1)" />
    <path d="M12 22l-2 5 6-5" fill="url(#fg1)" />
    <circle cx="14.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="18" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
    <circle cx="21.5" cy="15" r="1.3" fill="white" fillOpacity="0.9" />
  </svg>
);

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
    <div className="flex flex-row justify-center items-center relative z-10">
      {/* Left badge: Feedback */}
      <motion.div
        animate={isGlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
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

      {/* Left connecting line */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {isFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-primary-hex), var(--color-secondary-hex))" }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
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

      {/* Center: Saramsa */}
      <div className="relative z-10">
        <motion.div
          className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-secondary-rgb),0.2) 50%, transparent 80%)" }}
          animate={isGlowing ? { opacity: [0, 0.8, 0.5, 0.8, 0], scale: [0.95, 1.05, 1, 1.05, 0.95] } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 3, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
        />
        <motion.div
          animate={isGlowing ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 2.5, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" }}
          className="relative rounded-2xl p-[1.5px]"
          style={{
            background: isGlowing ? "linear-gradient(135deg, var(--color-primary-hex), var(--color-secondary-hex))" : "rgba(255,255,255,0.08)",
            transition: "background 0.8s ease",
          }}
        >
          <div className="flex items-center gap-3 rounded-2xl px-5 md:px-7 py-3 md:py-3.5" style={{ background: "hsl(var(--card))" }}>
            <img src="/logo-white.svg" alt="Saramsa" className="h-8 md:h-9 w-auto object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Right connecting line */}
      <div className="w-10 md:w-20 lg:w-28 h-[2px] bg-white/[0.06] relative overflow-hidden rounded-full">
        {isFlowing && (
          <motion.div
            className="absolute inset-0 h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-secondary-hex), var(--color-primary-hex))" }}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
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

      {/* Right badge: Action Items */}
      <motion.div
        animate={isGlowing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
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
   Character-by-Character Rotating Text
   "Raw Feedback" / "Messy Reviews" / "Support Tickets"
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
        <motion.span
          key={index}
          className="inline-flex"
        >
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

const featureSteps = [
  { label: "Feedback / Sentiment Analysis", img: "/placeholder.svg", step: 1 },
  { label: "Data Driven Decisions", img: "/placeholder.svg", step: 2 },
  { label: "User Story Creation", img: "/placeholder.svg", step: 3 },
  { label: "Action Prioritisation", img: "/placeholder.svg", step: 4 },
  { label: "DevOps Pipeline", img: "/placeholder.svg", step: 5 },
];

const coreFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI algorithms analyze sentiment, trends, and patterns in customer feedback automatically.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description: "Transform raw feedback into clear recommendations that drive product and service improvements.",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Data Integration",
    description: "Collect feedback from reviews, surveys, social media, and support tickets in one unified platform.",
  },
  {
    icon: GitBranch,
    title: "Connected Workflows",
    description: "Saramsa fits into the tools your teams already use, linking insights with Jira, Azure DevOps, Asana, and Slack.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Get instant insights as feedback comes in with our lightning-fast processing engine.",
  },
  {
    icon: TrendingUp,
    title: "Trend Detection",
    description: "Automatically identify emerging trends and patterns in customer sentiment over time.",
  },
];

const demoFeatures = [
  { icon: MessageSquare, title: "Feedback Collection", description: "See how we aggregate feedback from multiple sources" },
  { icon: BarChart3, title: "AI Analysis", description: "Watch our AI categorize and analyze sentiment" },
  { icon: TrendingUp, title: "Trend Detection", description: "Discover emerging patterns and opportunities" },
  { icon: Filter, title: "Smart Filters", description: "Slice data by any dimension you need" },
  { icon: Download, title: "Export Reports", description: "Generate stakeholder-ready reports instantly" },
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
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={350} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-40" delay={0.2} />
        <GlowOrb size={280} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-35" delay={0.5} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* 1. Badge — small contextual label first */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-xs md:text-sm text-primary font-medium mb-10 shimmer"
            >
              <Zap className="w-3.5 h-3.5" />
              Enterprise-Grade Product Management Agent
            </motion.div>

            {/* 2. Pipeline animation — visual hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <PipelineAnimation />
            </motion.div>

            {/* 3. Heading — two deliberate lines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight">
                {/* Line 1: Rotating gradient text */}
                <span className="block">
                  <RotatingText />
                </span>
                {/* Line 2: Static white text */}
                <span className="block text-foreground mt-1">
                  to Roadmap in Seconds
                </span>
              </h1>
            </motion.div>

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

      {/* Pipeline Steps Section */}
      <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
        <GlowOrb size={400} className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Feedback to Action,{" "}
              <span className="text-gradient">End to End</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From raw input to build-ready stories — Saramsa handles the entire pipeline.
            </p>
          </motion.div>

          {/* Pipeline Steps with numbers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-24">
            {featureSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col items-center p-6 rounded-2xl glass-card text-center"
              >
                {/* Step number */}
                <div className="step-number mb-4 shrink-0">
                  {step.step}
                </div>
                <div className="w-full aspect-video rounded-xl bg-primary/5 border border-primary/10 mb-4 overflow-hidden flex items-center justify-center group-hover:border-primary/20 transition-colors">
                  <img src={step.img} alt={step.label} className="w-14 h-14 opacity-30 group-hover:opacity-50 transition-opacity" />
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug">{step.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Section divider */}
          <div className="section-separator mb-24" />

          {/* Core Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Core <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The foundation of our platform, designed for reliability and performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group p-7 rounded-2xl glass-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/25 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-card/30" />
        <GlowOrb size={400} className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Interactive Demo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Experience <span className="text-gradient">Saramsa.ai</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              See how our AI transforms customer feedback into actionable insights in real-time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-card/90 border border-primary/40 shadow-[0_0_20px_-6px_rgba(var(--color-primary-rgb),0.3)]"
                      : "glass hover:bg-card/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeFeature === index ? "bg-primary/20 border border-primary/30" : "bg-secondary/60"
                    }`}>
                      <feature.icon className={`w-5 h-5 transition-colors duration-300 ${
                        activeFeature === index ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
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
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-card/40">
                <h3 className="text-sm font-semibold text-foreground">Feedback Dashboard</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              <div className="p-5 lg:p-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Total Feedback", value: "12,847" },
                    { label: "Positive", value: "67%" },
                    { label: "Issues Found", value: "23" },
                    { label: "Avg. Score", value: "4.2" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background/40 border border-border/40 rounded-xl p-3.5 text-center">
                      <div className="text-xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feedback list */}
                <div className="space-y-2">
                  {sampleFeedback.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-background/30 border border-border/30 rounded-xl p-3.5 flex items-center justify-between gap-4 hover:border-border/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          item.sentiment === "positive" ? "bg-green-500" : item.sentiment === "negative" ? "bg-destructive" : "bg-yellow-500"
                        }`} />
                        <p className="text-sm text-foreground truncate">{item.text}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium">{item.category}</span>
                        <span className="text-sm font-medium text-muted-foreground w-12 text-right">{Math.round(item.score * 100)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <GlowOrb size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="gradient-border rounded-3xl">
              <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-10 md:p-14">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  Ready to Transform Your Customer Insights?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join companies using Saramsa.ai to understand their customers better.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/about#contact">
                      Contact Us
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
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
