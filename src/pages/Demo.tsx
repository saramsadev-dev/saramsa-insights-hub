import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, BarChart3, MessageSquare, TrendingUp, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";

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

const Demo = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <GlowOrb size={400} className="top-0 left-1/4 -translate-y-1/2" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-6">
              Interactive Demo
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Experience{" "}
              <span className="text-gradient">Saramsa.ai</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              See how our AI transforms customer feedback into actionable insights in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Dashboard */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature Selector */}
            <div className="lg:col-span-1 space-y-3">
              {demoFeatures.map((feature, index) => (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeFeature === index
                      ? "glass-strong border-primary/50"
                      : "glass hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeFeature === index ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <feature.icon className={`w-5 h-5 ${
                        activeFeature === index ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-strong rounded-2xl p-6 min-h-[500px]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Feedback Dashboard</h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Feedback", value: "12,847" },
                  { label: "Positive", value: "67%" },
                  { label: "Issues Found", value: "23" },
                  { label: "Avg. Score", value: "4.2" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Feedback List */}
              <div className="space-y-3">
                {sampleFeedback.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-lg p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${
                        item.sentiment === "positive" ? "bg-green-500" :
                        item.sentiment === "negative" ? "bg-destructive" : "bg-yellow-500"
                      }`} />
                      <p className="text-sm text-foreground truncate">{item.text}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {item.category}
                      </span>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {Math.round(item.score * 100)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready for the Full Experience?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start your free 14-day trial and see how Saramsa.ai can transform your feedback strategy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
