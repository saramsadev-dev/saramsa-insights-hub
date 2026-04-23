import { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, Sparkles, ArrowRight, Users, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

const plans = [
  {
    name: "Starter",
    description: "For small teams getting started with AI-powered feedback analysis",
    price: "$19",
    period: "/month",
    meta: [
      { icon: Users, label: "1 user" },
      { icon: MessageSquare, label: "1,000 feedback/mo" },
      { icon: Zap, label: "10,000 AI credits" },
    ],
    features: [
      "Basic feedback summarization",
      "Sentiment & theme analysis",
      "Auto-tagging & classification",
      "User story generation with review queue",
      "Slack + file upload sources",
      "Real-time processing",
      "Email support",
    ],
    cta: "Contact Us",
    popular: false,
  },
  {
    name: "Growth",
    description: "The sweet spot for scaling product teams",
    price: "$90",
    period: "/month",
    meta: [
      { icon: Users, label: "5 users" },
      { icon: MessageSquare, label: "10,000 feedback/mo" },
      { icon: Zap, label: "75,000 AI credits" },
    ],
    features: [
      "Advanced summarization & analysis",
      "Full theme clustering & sentiment",
      "User story generation with review queue",
      "Word cloud & keyword extraction",
      "Basic historical analysis",
      "Jira + Azure DevOps integrations",
      "Priority email support",
    ],
    cta: "Contact Us",
    popular: true,
  },
  {
    name: "Pro",
    description: "Deep insights and automation for high-volume teams",
    price: "$299",
    period: "/month",
    meta: [
      { icon: Users, label: "10 users" },
      { icon: MessageSquare, label: "50,000 feedback/mo" },
      { icon: Zap, label: "300,000 AI credits" },
    ],
    features: [
      "Advanced AI across every workflow",
      "Advanced historical analysis",
      "Full user story workflow with review",
      "Work item priority & action items",
      "Real-time processing at scale",
      "Unlimited projects & custom DevOps integrations",
      "Chat + email support",
    ],
    cta: "Contact Us",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Contact us",
    period: "",
    meta: [
      { icon: Users, label: "25+ users" },
      { icon: MessageSquare, label: "Custom feedback limit" },
      { icon: Zap, label: "Custom AI credits" },
    ],
    features: [
      "Custom-tuned AI models",
      "Predictive historical analysis",
      "Custom user story workflows",
      "Unlimited projects & DevOps integrations",
      "Custom feedback source connectors",
      "Dedicated relationship manager",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

type Cell = string | boolean;

const comparisonGroups: { title: string; rows: { feature: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    title: "AI & Insights",
    rows: [
      { feature: "Feedback summarization", values: ["Basic", "Advanced", "Advanced", "Custom tuned"] },
      { feature: "Sentiment analysis", values: ["Basic", true, "Advanced", "Custom"] },
      { feature: "Auto-tagging / classification", values: ["Basic", true, true, true] },
      { feature: "Theme / cluster detection", values: ["Basic", true, "Advanced", "Custom"] },
      { feature: "Word cloud & keyword extraction", values: ["Basic", true, "Advanced", "Custom"] },
      { feature: "User story generation", values: ["Basic", true, "Full", "Custom workflows"] },
    ],
  },
  {
    title: "Product Management",
    rows: [
      { feature: "Insights dashboard", values: ["Basic", "Standard", "Advanced", "Custom"] },
      { feature: "Historical analysis", values: [false, "Basic", "Advanced", "Predictive"] },
      { feature: "User story review queue", values: [true, true, true, true] },
      { feature: "Work item priority & action items", values: [true, true, true, true] },
    ],
  },
  {
    title: "Data & Workflows",
    rows: [
      { feature: "Feedback sources (Slack, file upload)", values: ["Basic", true, true, "Custom"] },
      { feature: "DevOps integrations (Jira, Azure DevOps)", values: ["3", "10", "Custom", "Custom"] },
      { feature: "Real-time processing", values: [true, true, true, true] },
      { feature: "Projects / workspaces", values: ["1", "5", "Unlimited", "Unlimited"] },
      { feature: "Support", values: ["Email", "Priority email", "Chat + email", "Dedicated RM"] },
    ],
  },
];

const credits = [
  { action: "Process 1 feedback (summarize + classify)", cost: "10 credits", usd: "~$0.002" },
  { action: "Cluster 100 feedback items", cost: "50 credits", usd: "~$0.009" },
  { action: "Generate 1 user story", cost: "25 credits", usd: "~$0.004" },
  { action: "Re-run full analysis (bulk)", cost: "100–500 credits", usd: "$0.02–$0.08" },
];

const faqs = [
  {
    q: "How do AI credits work?",
    a: "Each plan includes a monthly pool of AI credits. Different actions consume different amounts — for example, processing one piece of feedback uses ~10 credits, generating a user story uses ~25. Unused credits don't carry over to the next month.",
  },
  {
    q: "What happens if I run out of credits or hit my feedback limit?",
    a: "We'll notify you as you approach your limit. You can purchase extended credits on-demand, upgrade your plan, or wait until your next billing cycle — there's no service interruption for the rest of your workspace.",
  },
  {
    q: "Can I switch between plans?",
    a: "Yes. Upgrade, downgrade, or move to a custom Enterprise plan anytime. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes — annual plans include a discount over monthly billing. Reach out and we'll set it up for you.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees on any plan. You only pay for what's in your chosen plan, plus any extended credits you buy on-demand.",
  },
];

const renderCell = (value: Cell) => {
  if (value === true) {
    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center mx-auto"
        style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.18), rgba(var(--color-secondary-rgb),0.12))" }}
      >
        <Check className="w-3.5 h-3.5 text-primary" />
      </div>
    );
  }
  if (value === false) {
    return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  }
  return <span className="text-sm text-foreground/90">{value}</span>;
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 lg:pt-44 pb-10 overflow-hidden">
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
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={400} className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <GlowOrb size={300} className="bottom-1/3 right-[8%] opacity-25" delay={0.4} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-base md:text-lg text-primary font-medium mb-8 shimmer"
            >
              Pricing Plans
            </motion.span>
            <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-tight tracking-tight">
              Simple, Transparent{" "}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground italic font-light">
              Plans scale with your feedback volume and team size. Every tier includes our full AI foundation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="plans" className="relative pt-16 lg:pt-20 overflow-hidden">
        <GlowOrb size={250} className="top-[20%] left-[5%] opacity-20 hidden md:block" delay={0.3} />
        <GlowOrb size={200} className="bottom-[10%] right-[8%] opacity-15 hidden md:block" delay={0.6} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-primary-btn text-white text-xs font-semibold shadow-lg shadow-primary/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative rounded-2xl overflow-hidden h-full">
                  {plan.popular ? (
                    <div className="absolute inset-0 rounded-2xl p-[2px]" style={{ background: "var(--gradient-primary)", opacity: 0.6 }}>
                      <div className="w-full h-full rounded-2xl bg-card" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }}>
                      <div className="w-full h-full rounded-2xl bg-card" />
                    </div>
                  )}
                  <div className="relative h-full rounded-2xl p-7 glass-card flex flex-col transition-all duration-400 ease-out hover:shadow-[0_0_40px_-10px_rgba(var(--color-secondary-rgb),0.3)] hover:-translate-y-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed italic font-light">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6 pb-6 border-b border-white/[0.06]">
                      <div className="flex items-baseline gap-1">
                        <span className={`font-bold text-foreground ${plan.price.startsWith("$") ? "text-4xl" : "text-2xl"}`}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-muted-foreground text-sm">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {plan.meta.map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground/90 font-medium">{label}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-px w-full bg-white/[0.06] mb-6" />

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.15), rgba(var(--color-secondary-rgb),0.1))" }}
                          >
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.popular ? (
                      <Button variant="hero" className="w-full h-11 text-sm" asChild>
                        <Link to="/about#contact">{plan.cta}</Link>
                      </Button>
                    ) : (
                      <Link
                        to="/about#contact"
                        className="flex items-center justify-center w-full h-11 rounded-lg p-[2px] bg-gradient-primary-btn hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
                      >
                        <span className="flex items-center justify-center w-full h-full rounded-md bg-background text-sm font-semibold text-foreground">
                          {plan.cta}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section id="compare" className="py-24 lg:py-32 relative overflow-hidden">
        <GlowOrb size={260} className="top-[10%] left-[5%] opacity-15 hidden md:block" delay={0.3} />
        <GlowOrb size={220} className="bottom-[15%] right-[6%] opacity-20 hidden md:block" delay={0.6} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-base md:text-lg text-primary font-medium mb-4">
              Compare Plans
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Everything you get, <span className="text-gradient">side-by-side</span>
            </h2>
            <p className="text-base text-muted-foreground italic font-light">
              Full breakdown of AI capabilities and product management features across every tier.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 rounded-2xl p-[1px] opacity-40" style={{ background: "var(--gradient-primary)" }}>
              <div className="w-full h-full rounded-2xl bg-card" />
            </div>
            <div className="relative glass-card rounded-2xl p-4 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate" style={{ borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Feature</th>
                      {plans.map((p) => (
                        <th key={p.name} className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-sm font-bold ${p.popular ? "text-gradient" : "text-foreground"}`}>{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.price}{p.period}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonGroups.map((group, gIndex) => (
                      <Fragment key={group.title}>
                        <tr>
                          <td
                            colSpan={5}
                            className={`text-xs font-semibold uppercase tracking-[0.15em] text-primary/90 py-3 px-4 ${
                              gIndex > 0 ? "pt-8" : ""
                            }`}
                          >
                            {group.title}
                          </td>
                        </tr>
                        {group.rows.map((row, rIndex) => (
                          <tr
                            key={`${group.title}-${row.feature}`}
                            className={rIndex % 2 === 0 ? "bg-white/[0.015]" : ""}
                          >
                            <td className="py-3.5 px-4 text-sm text-foreground/90 border-t border-white/[0.05]">
                              {row.feature}
                            </td>
                            {row.values.map((v, i) => (
                              <td key={i} className="py-3.5 px-4 text-center border-t border-white/[0.05]">
                                {renderCell(v)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credit Usage */}
      <section id="credits" className="py-20 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-sm md:text-base text-primary font-medium mb-4">
              Credit Usage
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Transparent <span className="text-gradient">per-action costs</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground italic font-light">
              Every plan includes a monthly credit pool. Here's what each action typically consumes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto grid gap-3"
          >
            {credits.map((c, i) => (
              <motion.div
                key={c.action}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }}>
                  <div className="w-full h-full rounded-xl bg-card" />
                </div>
                <div className="relative glass-card rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm md:text-base text-foreground/90">{c.action}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-primary">{c.cost}</span>
                    <span className="text-xs text-muted-foreground">{c.usd}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-xs text-muted-foreground/70 mt-8 italic font-light max-w-2xl mx-auto">
            Need more? Extended credits are available on-demand — no plan change required.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
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
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0 bg-background/40 pointer-events-none" />
        <GlowOrb size={250} className="top-[15%] right-[12%] opacity-20 hidden md:block" delay={0.4} />
        <GlowOrb size={200} className="bottom-[20%] left-[10%] opacity-25 hidden md:block" delay={0.7} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-base md:text-lg text-primary font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: "var(--gradient-primary)" }}>
                  <div className="w-full h-full rounded-xl bg-card" />
                </div>
                <div className="relative glass-card rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic font-light">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 italic font-light">Still have questions? We'd love to help.</p>
            <Button variant="hero" size="lg" className="md:h-12 md:px-8" asChild>
              <Link to="/about#contact">
                Talk to Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
