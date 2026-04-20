import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GlowOrb } from "@/components/3d/GlowOrb";

import logoJira from "@/assets/logos/jira.svg";
import logoAzure from "@/assets/logos/azure-devops.svg";
import logoSlack from "@/assets/logos/slack.svg";
import logoAsana from "@/assets/logos/asana.svg";
import logoTrello from "@/assets/logos/trello.svg";
import logoLinear from "@/assets/logos/linear.svg";
import logoZendesk from "@/assets/logos/zendesk.svg";
import logoIntercom from "@/assets/logos/intercom.svg";
import logoSurveyMonkey from "@/assets/logos/surveymonkey.svg";
import logoTypeform from "@/assets/logos/typeform.svg";
import logoGoogle from "@/assets/logos/google.svg";
import logoAppStore from "@/assets/logos/appstore.svg";
import logoHubSpot from "@/assets/logos/hubspot.svg";
import logoNotion from "@/assets/logos/notion.svg";

type Integration = {
  name: string;
  logo?: string;
  initial?: string;
  description: string;
  comingSoon?: boolean;
};

const inputSources: Integration[] = [
  { name: "Zendesk", logo: logoZendesk, description: "Support tickets & conversations" },
  { name: "Intercom", logo: logoIntercom, description: "In-app chat & feedback" },
  { name: "SurveyMonkey", logo: logoSurveyMonkey, description: "Survey responses & analytics" },
  { name: "Typeform", logo: logoTypeform, description: "Form responses & insights" },
  { name: "Google Reviews", logo: logoGoogle, description: "Business review monitoring" },
  { name: "App Store Reviews", logo: logoAppStore, description: "iOS & Android app reviews" },
];

const outputDestinations: Integration[] = [
  { name: "Jira", logo: logoJira, description: "Issue tracking & sprint planning" },
  { name: "Azure DevOps", logo: logoAzure, description: "Work items & pipelines" },
  { name: "Slack", logo: logoSlack, description: "Real-time team notifications" },
  { name: "Asana", logo: logoAsana, description: "Task management & workflows" },
  { name: "Trello", logo: logoTrello, description: "Board-based project tracking" },
  { name: "Linear", logo: logoLinear, description: "Modern issue tracking" },
];

const comingSoon: Integration[] = [
  { name: "HubSpot", logo: logoHubSpot, description: "CRM & customer data", comingSoon: true },
  { name: "Freshdesk", initial: "Fd", description: "Helpdesk & ticketing", comingSoon: true },
  { name: "Monday.com", initial: "Mo", description: "Work management", comingSoon: true },
  { name: "Notion", logo: logoNotion, description: "Docs & knowledge base", comingSoon: true },
];

const IntegrationTile = ({ item, index }: { item: Integration; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className={`group relative rounded-2xl p-5 md:p-6 transition-all duration-300 border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:border-white/[0.12] hover:bg-card/50 hover:-translate-y-0.5 ${item.comingSoon ? "opacity-60" : ""}`}
  >
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06] transition-transform duration-300 group-hover:scale-105 p-2">
        {item.logo ? (
          <img src={item.logo} alt={item.name} className="w-6 h-6" />
        ) : (
          <span className="text-muted-foreground font-bold text-sm">{item.initial}</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
          {item.comingSoon && (
            <span className="text-[10px] font-medium text-muted-foreground bg-white/[0.06] px-2 py-0.5 rounded-full">Soon</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
      </div>
    </div>
  </motion.div>
);

const Integrations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-background" />
        <GlowOrb size={450} className="absolute top-1/3 right-[10%] opacity-30" delay={0.2} />
        <GlowOrb size={350} className="absolute top-1/2 left-[5%] opacity-20" delay={0.5} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 text-base md:text-lg text-primary font-medium mb-8 shimmer"
            >
              Integrations
            </motion.span>
            <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-tight tracking-tight">
              Connect Your{" "}
              <span className="text-gradient">Entire Stack</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed italic font-light">
              Saramsa plugs into the tools you already use — pulling feedback in, pushing insights out.
            </p>
          </motion.div>

          {/* Compact visual flow — just text, no icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-12 text-xs md:text-sm text-muted-foreground font-medium"
          >
            <span className="px-4 py-2 rounded-full border border-white/[0.08] bg-card/30">Your tools</span>
            <span className="text-primary">→</span>
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold">Saramsa.ai</span>
            <span className="text-primary">→</span>
            <span className="px-4 py-2 rounded-full border border-white/[0.08] bg-card/30">Your workflows</span>
          </motion.div>
        </div>
      </section>

      {/* Feedback Sources */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 lg:mb-10 max-w-2xl"
          >
            <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">Input</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Feedback Sources
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Pull customer feedback from support platforms, surveys, reviews, and conversations into one place.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {inputSources.map((item, i) => (
              <IntegrationTile key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Output Destinations */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-card/20 to-card/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 lg:mb-10 max-w-2xl"
          >
            <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">Output</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Where Insights Land
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Push prioritized action items and user stories directly into your team's project management tools.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {outputDestinations.map((item, i) => (
              <IntegrationTile key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 lg:mb-10 max-w-2xl"
          >
            <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">Roadmap</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Coming Soon
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              We're adding new integrations every month. Here's what's next.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {comingSoon.map((item, i) => (
              <IntegrationTile key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partnerships" className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-card/20 to-card/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10 lg:mb-12">
              <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">Partnerships</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Grow With Us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Technology",
                  description: "Integrate your platform with Saramsa.ai. Ideal for feedback, CRM, or PM tools.",
                },
                {
                  title: "Implementation",
                  description: "Help enterprises deploy Saramsa.ai. Earn revenue delivering measurable outcomes.",
                },
                {
                  title: "Referral",
                  description: "Refer product teams and earn commissions on every successful deal.",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 border border-white/[0.06] bg-card/30 backdrop-blur-sm text-center"
                >
                  <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center text-primary font-bold text-lg border border-white/[0.08]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))" }}>
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <GlowOrb size={300} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Don't see your tool?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-8 italic font-light">
              We're building new integrations every month. Tell us what you need.
            </p>
            <Button asChild variant="hero" size="lg" className="md:h-12 md:px-8">
              <Link to="/about#contact">
                Request an Integration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integrations;
