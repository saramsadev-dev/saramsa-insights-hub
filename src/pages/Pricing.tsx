import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started with feedback analysis",
    price: "$29",
    period: "/month",
    features: [
      "Up to 5,000 feedback entries/month",
      "Basic sentiment analysis",
      "3 integrations",
      "Email support",
      "7-day data retention",
      "Basic reporting",
    ],
    cta: "Contact Us",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing teams that need advanced insights",
    price: "$299",
    period: "/month",
    features: [
      "Up to 50,000 feedback entries/month",
      "Advanced AI analysis",
      "Unlimited integrations",
      "Priority support",
      "90-day data retention",
      "Custom dashboards",
      "API access",
      "Team collaboration",
    ],
    cta: "Contact Us",
    popular: true,
  },
  {
    name: "Token-Based",
    description: "Pay only for what you use — ideal for variable workloads",
    price: "Usage",
    period: " based",
    features: [
      "Pay per feedback entry processed",
      "Full AI analysis suite",
      "All integrations included",
      "No monthly commitment",
      "Unlimited data retention",
      "Priority support",
      "API access",
    ],
    cta: "Contact Us",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited feedback entries",
      "Custom AI models",
      "Dedicated success manager",
      "24/7 phone support",
      "Unlimited data retention",
      "White-label options",
      "SSO & advanced security",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "What's the difference between fixed and token-based pricing?",
    a: "Fixed plans give you a set monthly allowance of feedback entries at a predictable cost. Token-based pricing lets you pay per entry processed — great if your volume fluctuates month to month.",
  },
  {
    q: "Can I switch between plans?",
    a: "Yes, you can upgrade, downgrade, or switch to token-based at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What happens if I exceed my monthly limit on a fixed plan?",
    a: "We'll notify you before you hit the limit. You can upgrade your plan or purchase additional capacity without any service interruption.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes, annual plans come with a 20% discount compared to monthly billing.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees on any plan. You only pay for what's in your chosen plan.",
  },
];

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
              Choose the plan that fits your needs. All plans include a 14-day free trial.
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
                  <div className={`
                    relative h-full rounded-2xl p-7
                    transition-all duration-400 ease-out
                    hover:shadow-[0_0_40px_-10px_rgba(var(--color-secondary-rgb),0.3)]
                    hover:-translate-y-1
                    ${plan.popular ? "glass-card" : "glass-card"}
                  `}>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed italic font-light">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-7 pb-7 border-b border-white/[0.06]">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {plan.period}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
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
                      <Button variant="hero" className="w-full" size="lg" asChild>
                        <Link to="/about#contact">{plan.cta}</Link>
                      </Button>
                    ) : (
                      <Link
                        to="/about#contact"
                        className="flex items-center justify-center w-full rounded-lg p-[2px] bg-gradient-primary-btn hover:scale-105 active:scale-95 hover:glow-primary transition-all duration-300"
                      >
                        <span className="flex items-center justify-center w-full rounded-md bg-background px-5 py-2.5 text-sm font-semibold text-foreground">
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
