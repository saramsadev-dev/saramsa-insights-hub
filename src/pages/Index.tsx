import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Brain, MessageSquare, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBubble } from "@/components/3d/FloatingBubble";
import { FloatingBrain } from "@/components/3d/FloatingBrain";
import { FloatingChart } from "@/components/3d/FloatingChart";
import { FloatingNodes } from "@/components/3d/FloatingNodes";
import { GlowOrb } from "@/components/3d/GlowOrb";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze sentiment, trends, and patterns in customer feedback.",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Integration",
    description: "Collect feedback from reviews, surveys, social media, and support tickets in one unified platform.",
  },
  {
    icon: BarChart3,
    title: "Actionable Insights",
    description: "Transform raw data into clear recommendations that drive product and service improvements.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Get instant insights as feedback comes in with our lightning-fast processing engine.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with GDPR, SOC 2, and HIPAA standards.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Support for 100+ languages with automatic translation and cultural context analysis.",
  },
];

const stats = [
  { value: "10M+", label: "Feedback Analyzed" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <GlowOrb size={500} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" delay={0.2} />
        <GlowOrb size={400} className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" delay={0.5} />
        
        {/* 3D Elements */}
        <FloatingBrain size={80} className="top-1/4 right-[15%] hidden lg:block" delay={0.3} />
        <FloatingBubble size={70} className="bottom-1/3 left-[10%] hidden lg:block" delay={0.6} />
        <FloatingChart size={90} className="top-1/3 left-[18%] hidden lg:block" delay={0.4} />
        <FloatingNodes size={60} className="bottom-1/4 right-[18%] hidden lg:block" delay={0.7} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Turn Feedback Into{" "}
              <span className="text-gradient">Actionable Insights</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Saramsa.ai uses advanced AI to analyze customer feedback at scale, uncovering trends, 
              sentiment, and opportunities that drive business growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/demo">
                  Try Free Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/contact">Contact Sales</Link>
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
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
        <GlowOrb size={400} className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Powerful Features for{" "}
              <span className="text-gradient">Modern Teams</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand your customers and make data-driven decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl glass hover:bg-card/70 transition-all duration-300 hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <GlowOrb size={600} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center glass-strong rounded-3xl p-8 md:p-12 lg:p-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Customer Insights?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 500+ companies using Saramsa.ai to understand their customers better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/demo">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
