import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
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
      <section className="relative pt-36 lg:pt-44 pb-10">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb
          size={400}
          className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-6">
              Pricing Plans
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Simple, Transparent{" "}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative pt-16 lg:pt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-primary-btn text-white text-xs font-semibold shadow-lg shadow-primary/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`
                  h-full rounded-2xl p-7
                  transition-all duration-400 ease-out
                  hover:shadow-[0_0_40px_-10px_rgba(var(--color-secondary-rgb),0.3)]
                  hover:-translate-y-1
                  ${
                    plan.popular
                      ? "bg-card/80 backdrop-blur-xl border-2 border-primary/40"
                      : "glass-card"
                  }
                `}>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-7 pb-7 border-b border-border/40">
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
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/about#contact">
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
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
                className="glass-card rounded-xl p-6"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {faq.q}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
