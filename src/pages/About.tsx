import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Sparkles, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/3d/GlowOrb";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const FREE_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com",
  "gmx.com", "live.com", "me.com", "msn.com", "rediffmail.com",
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address").max(255).refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && !FREE_EMAIL_DOMAINS.includes(domain);
    },
    { message: "Please use your work email address" }
  ),
  company: z.string().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type FormErrors = { name?: string; email?: string; company?: string; message?: string };

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name as keyof typeof contactSchema.shape];
      if (fieldSchema) { fieldSchema.parse(value); setErrors(prev => ({ ...prev, [name]: undefined })); }
    } catch (error) {
      if (error instanceof z.ZodError) setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as keyof FormErrors] = err.message; });
      setErrors(fieldErrors);
      setTouched({ name: true, email: true, company: true, message: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "be527df5-46bf-4cc4-983d-5c0cde08bf10",
          from_name: "Saramsa.ai Contact Form",
          subject: `Contact from ${result.data.name}${result.data.company ? ` (${result.data.company})` : ""}`,
          name: result.data.name,
          email: result.data.email,
          company: result.data.company || "N/A",
          message: result.data.message,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
        setFormData({ name: "", email: "", company: "", message: "" });
        setErrors({}); setTouched({});
      } else {
        toast({ title: "Failed to send message", description: "Please try again or email us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Failed to send message", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

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
              About Saramsa
            </motion.span>
            <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-tight tracking-tight">
              The <span className="text-gradient">Essence</span> of Feedback
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic font-light max-w-xl mx-auto">
              Saramsa means <span className="text-foreground font-medium not-italic">essence</span> — the insight distilled from complexity. We built Saramsa.ai to do exactly that with customer feedback, at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">
              From Noise to Clarity
            </h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Product teams drown in feedback — support tickets, surveys, app reviews, sales calls. The signal is there, but it's buried under volume and noise.
              </p>
              <p>
                Saramsa.ai analyzes feedback at scale, prioritizes what matters, and generates ready-to-build user stories delivered directly into your project management tools. One click. One space. Complete clarity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-card/20 to-card/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Sparkles, title: "Essence", desc: "Distilling clarity from the noise of thousands of customer voices." },
              { icon: Target, title: "Precision", desc: "AI that prioritizes what actually moves the needle for your product." },
              { icon: Lightbulb, title: "Action", desc: "Build-ready user stories delivered where your team already works." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-white/[0.06] bg-card/30 backdrop-blur-sm text-center"
              >
                <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center border border-white/[0.08]" style={{ background: "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))" }}>
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — removed: links to same page contact section, redundant */}

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-card/20 to-card/10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-3xl mx-auto text-center"
          >
            <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">Contact</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
              Let's Start a Conversation
            </h2>
            <p className="text-sm text-muted-foreground">
              Have questions about Saramsa.ai? Fill the form or reach out directly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              <a
                href="mailto:saramsa.aiventures@gmail.com"
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:border-white/[0.12] hover:bg-card/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06] group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium text-foreground">saramsa.aiventures@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919789524825"
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:border-white/[0.12] hover:bg-card/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.06] group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-foreground">+91-9789524825</p>
                </div>
              </a>

              <p className="text-xs text-muted-foreground pt-2 italic">
                We're a small, focused team — you'll always speak to someone who knows the product.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-8 border border-white/[0.06] bg-card/30 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="John Doe" className={`bg-background/50 border-white/[0.08] focus:border-primary/50 ${errors.name && touched.name ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                      {errors.name && touched.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.name}</motion.p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company</label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} placeholder="Your Company" className={`bg-background/50 border-white/[0.08] focus:border-primary/50 ${errors.company && touched.company ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                      {errors.company && touched.company && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.company}</motion.p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="john@company.com" className={`bg-background/50 border-white/[0.08] focus:border-primary/50 ${errors.email && touched.email ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                    {errors.email && touched.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.email}</motion.p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about your needs..." rows={4} className={`bg-background/50 border-white/[0.08] focus:border-primary/50 ${errors.message && touched.message ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                    {errors.message && touched.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.message}</motion.p>}
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
