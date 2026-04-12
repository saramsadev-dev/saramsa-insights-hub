import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingNodes } from "@/components/3d/FloatingNodes";
import { FloatingChart } from "@/components/3d/FloatingChart";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GlowOrb } from "@/components/3d/GlowOrb";

const taskTrackerIntegrations = [
  {
    name: "Jira",
    description: "Seamlessly sync action items to Jira issues. Auto-create tickets from customer feedback insights with proper prioritization and labeling.",
    features: ["Auto-create issues", "Two-way sync", "Custom field mapping", "Sprint integration"],
    logo: "🔷"
  },
  {
    name: "Azure DevOps",
    description: "Connect feedback insights directly to Azure DevOps work items. Track progress and ensure customer voice drives development.",
    features: ["Work item creation", "Backlog integration", "Pipeline triggers", "Board updates"],
    logo: "🔶"
  },
  {
    name: "Slack",
    description: "Get real-time notifications on critical feedback. Share insights with teams and trigger workflows from conversations.",
    features: ["Real-time alerts", "Channel routing", "Slash commands", "Workflow triggers"],
    logo: "💬"
  },
  {
    name: "Asana",
    description: "Transform insights into Asana tasks. Keep your product team aligned with customer needs through automated task creation.",
    features: ["Task automation", "Project sync", "Timeline updates", "Team assignments"],
    logo: "🎯"
  },
  {
    name: "Trello",
    description: "Push action items directly to Trello boards. Visualize customer feedback priorities with automated card management.",
    features: ["Card creation", "Board automation", "Label mapping", "Checklist sync"],
    logo: "📋"
  },
  {
    name: "Linear",
    description: "Modern issue tracking meets customer insights. Create Linear issues from feedback with intelligent categorization.",
    features: ["Issue creation", "Cycle planning", "Priority mapping", "Team routing"],
    logo: "⚡"
  }
];

const inputIntegrations = [
  {
    name: "Zendesk",
    description: "Import support tickets and customer conversations. Analyze patterns across your entire support history.",
    features: ["Ticket import", "Conversation analysis", "Sentiment tracking", "Agent insights"],
    logo: "🎫"
  },
  {
    name: "Intercom",
    description: "Capture in-app feedback and chat conversations. Understand customer needs from real-time interactions.",
    features: ["Chat import", "Survey capture", "User segments", "Product tours"],
    logo: "💭"
  },
  {
    name: "SurveyMonkey",
    description: "Import survey responses automatically. Convert structured feedback into actionable insights.",
    features: ["Survey sync", "Response analysis", "Trend tracking", "Custom questions"],
    logo: "📊"
  },
  {
    name: "Typeform",
    description: "Beautiful forms meet powerful analysis. Import Typeform responses for deep insight extraction.",
    features: ["Form import", "Logic analysis", "Response patterns", "Completion tracking"],
    logo: "📝"
  },
  {
    name: "Google Reviews",
    description: "Monitor and analyze Google Business reviews. Stay on top of public customer sentiment.",
    features: ["Review import", "Rating trends", "Response suggestions", "Location insights"],
    logo: "⭐"
  },
  {
    name: "App Store & Play Store",
    description: "Track app reviews across both platforms. Understand mobile user feedback at scale.",
    features: ["Review aggregation", "Version tracking", "Competitor analysis", "Rating alerts"],
    logo: "📱"
  }
];

const IntegrationCard = ({ integration, index }: { integration: typeof taskTrackerIntegrations[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group glass-card rounded-2xl p-6 lg:p-7"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/15 group-hover:border-primary/25 transition-all shrink-0">
        {integration.logo}
      </div>
      <h3 className="text-lg font-bold text-foreground">{integration.name}</h3>
    </div>
    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
      {integration.description}
    </p>
    <div className="grid grid-cols-2 gap-2">
      {integration.features.map((feature, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Integrations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-background" />
        <GlowOrb size={500} className="absolute top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2" delay={0.2} />
        <GlowOrb size={400} className="absolute bottom-2/3 left-[5%] -translate-x-1/2 translate-y-1/2" delay={0.2} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-6">
              Ecosystem
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Partnerships &{" "}
              <span className="text-gradient">Integrations</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
              Saramsa.ai integrates with your favorite tools to capture feedback from every source and push action items where your team works.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our partner ecosystem — whether you're a technology platform, implementation consultant, or referral partner, we grow together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-card/30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Partner With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Partnership <span className="text-gradient">Types</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Technology Partners", description: "Integrate your product with Saramsa.ai to offer enhanced, end-to-end solutions. Ideal for platforms in the feedback, CRM, or project management space." },
              { title: "Implementation Partners", description: "Help enterprises deploy and optimize Saramsa.ai within their product workflows. Earn revenue while delivering measurable outcomes for clients." },
              { title: "Referral Partners", description: "Refer product teams and earn competitive commissions on every successful deal. Simple, low-effort, high-reward." },
            ].map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center glass-card rounded-2xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-primary font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Task Tracker Integrations */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Output
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Action Item <span className="text-gradient">Tracking</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Push insights directly to your project management tools. Ensure every piece of feedback drives meaningful action.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {taskTrackerIntegrations.map((integration, index) => (
              <IntegrationCard key={integration.name} integration={integration} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Input Integrations */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-card/30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Input
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Feedback <span className="text-gradient">Sources</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Capture customer feedback from every channel. Connect your existing tools to build a complete picture of customer sentiment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inputIntegrations.map((integration, index) => (
              <IntegrationCard key={integration.name} integration={integration} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="gradient-border rounded-3xl max-w-4xl mx-auto">
              <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-10 md:p-14 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                  Don't See Your Tool?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                  We're constantly adding new integrations. Contact us to request a specific integration or discuss custom API connections.
                </p>
                <Button asChild variant="hero" size="xl">
                  <Link to="/about#contact">
                    Request Integration
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integrations;
