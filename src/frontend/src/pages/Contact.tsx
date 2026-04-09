import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useContact";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const steps = [
  { label: "You send your message below" },
  { label: "I review your project within 24 hours" },
  { label: "We schedule a discovery call" },
  { label: "We start building your vision" },
];

const highlights = [
  { icon: Clock, text: "24-hour response time" },
  { icon: Sparkles, text: "Free initial consultation" },
  { icon: CheckCircle2, text: "No commitment required" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitContact();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateOnBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = {
      name: !form.name.trim() ? "Name is required" : "",
      email: !form.email.trim()
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? "Enter a valid email address"
          : "",
      message: !form.message.trim() ? "Message is required" : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {/* Hero banner */}
      <section
        className="relative overflow-hidden bg-foreground py-20 md:py-28"
        data-ocid="contact-hero"
      >
        {/* Subtle decorative gradient blobs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 142), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.22 70), transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/10 font-mono text-xs uppercase tracking-widest px-4 py-1.5"
            >
              Open for Projects
            </Badge>
          </motion.div>

          <motion.h1
            className="hero-title text-primary-foreground mb-5"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Let's Build <span className="gradient-text">Something Great</span>
          </motion.h1>

          <motion.p
            className="section-subtitle text-primary-foreground/60 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm available for new projects, collaborations, and business
            partnerships. Reach out — I'd love to hear your idea.
          </motion.p>

          {/* Highlight pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {highlights.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/70 text-sm font-medium"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main two-column section */}
      <section
        className="bg-background py-20 md:py-28"
        data-ocid="contact-form-section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* ── Left column: info ── */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div>
                <h2 className="section-title mb-3">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  I'm available for new projects and collaborations. Whether you
                  need a website, app, or full web solution — let's talk about
                  how I can help you grow.
                </p>
              </div>

              {/* Direct email */}
              <div>
                <p className="data-label mb-3">Direct email</p>
                <a
                  href="mailto:maxvwede@gmail.com"
                  data-ocid="contact-page-email"
                  className="inline-flex items-center gap-3 group"
                  aria-label="Email Vwede at maxvwede@gmail.com"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-smooth break-all">
                    maxvwede@gmail.com
                  </span>
                </a>
                <p className="mt-2 text-xs text-muted-foreground pl-14">
                  Messages submitted via the form are saved and read by Vwede
                  personally.
                </p>
              </div>

              {/* Process steps */}
              <div>
                <p className="data-label mb-4">What happens next</p>
                <ol className="flex flex-col gap-4">
                  {steps.map((step, i) => (
                    <li key={step.label} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-snug">
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Trust card */}
              <Card className="p-5 border-border bg-muted/30">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      No commitment required
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your first conversation is completely free. Let's explore
                      whether we're a great fit before you commit to anything.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ── Right column: form ── */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              {submitted ? (
                <div
                  data-ocid="contact-success-state"
                  className="flex flex-col items-center justify-center py-16 gap-6 text-center"
                >
                  <motion.span
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.span>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Message Received!
                    </h2>
                    <p className="text-muted-foreground max-w-sm leading-relaxed">
                      Thanks for reaching out. I'll review your message and get
                      back to you within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                      setErrors({ name: "", email: "", message: "" });
                    }}
                    className="secondary-button gap-2"
                    data-ocid="contact-send-another"
                  >
                    Send another message <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Card className="p-8 md:p-10 border-border bg-card shadow-subtle">
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                      <MessageSquare className="w-5 h-5" />
                    </span>
                    <div>
                      <h2 className="font-display font-bold text-foreground text-lg">
                        Send a Message
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        All fields are required
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground"
                        >
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          data-ocid="contact-input-name"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={validateOnBlur}
                          className={`h-11 bg-background border-input focus-visible:ring-primary/50 transition-smooth ${
                            errors.name ? "border-destructive" : ""
                          }`}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            role="alert"
                            className="text-xs text-destructive"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          data-ocid="contact-input-email"
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={validateOnBlur}
                          className={`h-11 bg-background border-input focus-visible:ring-primary/50 transition-smooth ${
                            errors.email ? "border-destructive" : ""
                          }`}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            role="alert"
                            className="text-xs text-destructive"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        data-ocid="contact-input-message"
                        placeholder="Tell me about your project — what you want to build, your timeline, and any details that will help me understand your vision..."
                        value={form.message}
                        onChange={handleChange}
                        onBlur={validateOnBlur}
                        className={`min-h-[180px] resize-y bg-background border-input focus-visible:ring-primary/50 transition-smooth ${
                          errors.message ? "border-destructive" : ""
                        }`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          role="alert"
                          className="text-xs text-destructive"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      data-ocid="contact-submit-btn"
                      disabled={isPending}
                      className="cta-button w-full h-12 text-base gap-2 mt-1"
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
