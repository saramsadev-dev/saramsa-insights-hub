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
    cta: "Start Free Trial",
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
    cta: "Start Free Trial",
    popular: true,
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

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-10">
        <div className="absolute inset-0 grid-pattern opacity-50" />
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
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
      <section className="relative pt-20 -mt-6 md:-mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* GROUP is important for hover interaction */}
          <div className="group grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative rounded-2xl p-8
                  transition-all duration-300 ease-out
                  group-hover:scale-[0.96]
                  hover:!scale-105 hover:z-10
                  ${
                    plan.popular
                      ? "glass-strong border-primary/50 scale-105"
                      : "glass"
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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
                  <Link
                    to={plan.name === "Enterprise" ? "/contact" : "/demo"}
                  >
                    {plan.cta}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can I change plans at any time?",
                a: "Yes, you can upgrade or downgrade your plan at any time.",
              },
              {
                q: "What happens if I exceed my monthly limit?",
                a: "We'll notify you and you can upgrade or add capacity.",
              },
              {
                q: "Do you offer annual billing?",
                a: "Yes, we offer a 20% discount on annual plans.",
              },
              {
                q: "Is there a setup fee?",
                a: "No, there are no setup fees.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {faq.q}
                </h4>
                <p className="text-sm text-muted-foreground">
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
