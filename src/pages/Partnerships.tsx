import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Handshake, Rocket, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";
import { FloatingSphere } from "@/components/3d/FloatingSphere";

const partners = [
  { name: "TechCorp", logo: "TC" },
  { name: "DataFlow", logo: "DF" },
  { name: "CloudSync", logo: "CS" },
  { name: "AIVentures", logo: "AI" },
  { name: "ScaleUp", logo: "SU" },
  { name: "NextGen", logo: "NG" },
];

const benefits = [
  {
    icon: Building2,
    title: "Revenue Sharing",
    description: "Earn up to 30% recurring commission on referred customers.",
  },
  {
    icon: Handshake,
    title: "Co-Marketing",
    description: "Joint marketing campaigns, case studies, and event sponsorships.",
  },
  {
    icon: Rocket,
    title: "Early Access",
    description: "Get first access to new features and beta programs.",
  },
  {
    icon: Award,
    title: "Partner Portal",
    description: "Dedicated resources, training, and sales enablement tools.",
  },
];

const Partnerships = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-60 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <GlowOrb size={500} className="top-0 right-0 translate-x-1/3 -translate-y-1/3" />
        <FloatingSphere size={100} className="bottom-20 left-[10%] hidden lg:block" delay={0.3} />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/*<span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-6">
              Partner Program
            </span>*/}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Grow Together With{" "}
              <span className="text-gradient">Saramsa.ai</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join our partner ecosystem and help businesses unlock the power of customer feedback analytics.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Become a Partner</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partners Logos */}
      {/* <section className="py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            Trusted by leading companies worldwide
          </motion.p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-16 h-16 rounded-xl glass flex items-center justify-center text-xl font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                {partner.logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Partner Benefits - commented out per content doc */}
      {/*
      <section className="py-24 lg:py-32 relative">
        <GlowOrb size={400} className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partner <span className="text-gradient">Benefits</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We invest in our partners' success with industry-leading support and incentives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Partner Types */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partnership <span className="text-gradient">Types</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Technology Partners",
                description: "Integrate your product with Saramsa.ai to offer enhanced, end-to-end solutions. Ideal for platforms in the feedback, CRM, or project management space.",
              },
              {
                title: "Implementation Partners",
                description: "Help enterprises deploy and optimize Saramsa.ai within their product workflows. Earn revenue while delivering measurable outcomes for clients.",
              },
              {
                title: "Referral Partners",
                description: "Refer product teams and earn competitive commissions on every successful deal. Simple, low-effort, high-reward.",
              },
            ].map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center glass rounded-2xl p-8"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <GlowOrb size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Partner?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our growing partner network and unlock new opportunities.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Apply Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
