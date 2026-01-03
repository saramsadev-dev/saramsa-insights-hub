import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Brain, MessageSquare, BarChart3, Zap, GitBranch, 
  TrendingUp, Users, FileText, Bell, Layers, Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBubble } from "@/components/3d/FloatingBubble";
import { FloatingBrain } from "@/components/3d/FloatingBrain";
import { FloatingChart } from "@/components/3d/FloatingChart";
import { GlowOrb } from "@/components/3d/GlowOrb";

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
    description:
      "Saramsa fits into the tools your teams already use, linking insights with Jira, Azure DevOps, Asana, and Slack."
  },    
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Get instant insights as feedback comes in with our lightning-fast processing engine.",
  },
  /*
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with GDPR, SOC 2, and HIPAA standards.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Support for 100+ languages with automatic translation and cultural context analysis.",
  },*/
];

const advancedFeatures = [
  {
    icon: TrendingUp,
    title: "Trend Detection",
    description: "Automatically identify emerging trends and patterns in customer sentiment over time.",
  },
  /*{
    icon: Users,
    title: "Customer Segmentation",
    description: "Group customers based on feedback patterns, preferences, and behavior.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly when critical feedback patterns or anomalies are detected.",
  },*/
  {
    icon: Layers,
    title: "Custom Dashboards",
    description: "Build personalized dashboards with drag-and-drop widgets and visualizations.",
  },
  {
    icon: Layers,
    title: "Smart Feedback Organisation",
    description:
      "Customer feedback is thoughtfully organised into clear categories such as bugs, enhancements, and feature requests, making it easier to act on."
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description: "Schedule and customize reports delivered to your inbox with key insights.",
  },
  /*{
    icon: Search,
    title: "Deep Search",
    description: "Semantic search across all feedback data to find exactly what you're looking for.",
  },*/
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <GlowOrb size={500} className="absolute top-1/4 right-[10%] translate-x-1/2 -translate-y-1/2 z=0" delay={0.2} />
        <GlowOrb size={400} className="absolute bottom-1/4 left-[14%] -translate-x-1/2 translate-y-1/2 z=0" delay={0.5} />
        
        <FloatingChart size={70} className="top-40 right-[10%] hidden lg:block" delay={0.3} />
        {/*<FloatingBrain size={90} className="top-60 left-[15%] hidden lg:block" delay={0.5} />*/}
        <FloatingBubble size={60} className="bottom-20 left-[15%] hidden lg:block" delay={0.7} />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Everything You Need to{" "}
              <span className="text-gradient">Understand Customers</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Powerful AI-driven tools designed to transform customer feedback into strategic business advantages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The foundation of our platform, designed for reliability and performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl glass hover:bg-card/70 transition-all duration-300 hover:border-primary/30"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 border-y border-border bg-card/30 relative overflow-hidden">
        <GlowOrb size={350} className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced <span className="text-gradient">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take your analytics to the next level with powerful advanced tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
      <section className="py-24 relative overflow-hidden">
        <GlowOrb size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center glass-strong rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience All Features
            </h2>
            <p className="text-muted-foreground mb-8">
              Start your free trial today and see how Saramsa.ai can transform your customer insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/demo">
                  Try Free Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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

export default Features;
