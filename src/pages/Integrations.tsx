import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingNodes } from "@/components/3d/FloatingNodes";
import { FloatingChart } from "@/components/3d/FloatingChart";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{integration.logo}</span>
        <h3 className="text-xl font-bold text-foreground">{integration.name}</h3>
      </div>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {integration.description}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {integration.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Integrations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <FloatingNodes className="absolute top-40 right-10 opacity-40" />
        <FloatingChart className="absolute bottom-20 left-10 opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Integrations
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"> Entire Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Saramsa.ai integrates with your favorite tools to capture feedback from every source and push action items where your team works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Task Tracker Integrations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Action Item <span className="text-primary">Tracking</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Push insights directly to your project management tools. Ensure every piece of feedback drives meaningful action.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskTrackerIntegrations.map((integration, index) => (
              <IntegrationCard key={integration.name} integration={integration} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Input Integrations */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Feedback <span className="text-primary">Sources</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Capture customer feedback from every channel. Connect your existing tools to build a complete picture of customer sentiment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inputIntegrations.map((integration, index) => (
              <IntegrationCard key={integration.name} integration={integration} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-12 border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See Your Tool?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              We're constantly adding new integrations. Contact us to request a specific integration or discuss custom API connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Request Integration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/demo">
                  See Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integrations;
