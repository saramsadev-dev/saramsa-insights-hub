import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBubble } from "@/components/3d/FloatingBubble";
import { FloatingBrain } from "@/components/3d/FloatingBrain";
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

  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name as keyof typeof contactSchema.shape];
      if (fieldSchema) { fieldSchema.parse(value); setErrors(prev => ({ ...prev, [name]: undefined })); }
    } catch (error) {
      if (error instanceof z.ZodError) setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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

      {/* About Hero */}
      <section className="relative pt-36 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <GlowOrb size={450} className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" delay={0.2} />
        <FloatingBubble size={70} className="top-40 right-[12%] hidden lg:block" delay={0.3} />
        <FloatingBrain size={80} className="bottom-20 left-[12%] hidden lg:block" delay={0.7} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-6">
              Clarity. Insight. Action.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              What Does{" "}
              <span className="text-gradient">Saramsa</span> Mean?
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Saramsa means <span className="text-foreground font-medium">essence</span> — the insight distilled from complexity.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Leveraging the power of AI, we do exactly that with all your feedback, insights, and action items — at the click of a button, in one space. Saramsa.ai analyzes feedback at scale, prioritizes what matters, and generates ready-to-build user stories delivered directly into your project management tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Join Our Journey CTA */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <GlowOrb size={400} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="gradient-border rounded-3xl">
              <div className="bg-card/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Join Our Journey</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  We're always looking for talented people who share our passion for customer understanding.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="#contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-card/40 to-card/20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs text-primary font-semibold uppercase tracking-widest mb-4">
              Reach Out
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions about Saramsa.ai? We're here to help you transform your customer feedback strategy.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-8 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Our team is ready to answer your questions and help you get started with Saramsa.ai. Reach out — we typically respond within a few hours.
                </p>
                <div className="space-y-3">
                  <motion.a
                    href="mailto:saramsa.aiventures@gmail.com"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/25 transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email us at</p>
                      <p className="text-sm font-medium text-foreground">saramsa.aiventures@gmail.com</p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="tel:+919789524825"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border/40 hover:border-primary/40 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/25 transition-all">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Call us on</p>
                      <p className="text-sm font-medium text-foreground">+91-9789524825</p>
                    </div>
                  </motion.a>
                </div>
              </div>
              <p className="mt-8 text-xs text-muted-foreground border-t border-border/40 pt-6">
                We're a small, focused team — you'll always speak to someone who knows the product.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-1">Send us a Message</h3>
                <p className="text-sm text-muted-foreground mb-6">Fill in the form and we'll be in touch shortly.</p>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="John Doe" className={`bg-background/50 border-border/60 focus:border-primary/50 ${errors.name && touched.name ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                      {errors.name && touched.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.name}</motion.p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">Company</label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} placeholder="Your Company" className={`bg-background/50 border-border/60 focus:border-primary/50 ${errors.company && touched.company ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                      {errors.company && touched.company && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.company}</motion.p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="john@company.com" className={`bg-background/50 border-border/60 focus:border-primary/50 ${errors.email && touched.email ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
                    {errors.email && touched.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm font-medium text-destructive">{errors.email}</motion.p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about your needs..." rows={5} className={`bg-background/50 border-border/60 focus:border-primary/50 ${errors.message && touched.message ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
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
