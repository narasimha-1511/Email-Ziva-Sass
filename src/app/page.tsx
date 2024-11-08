"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Star,
  Mail,
  Zap,
  Clock,
  CheckCircle,
  ArrowLeftRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { PinRightIcon } from "@radix-ui/react-icons";
const userTypes = ["Creators", "Founders", "Managers"];

export default function Component() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200 - Math.random() * 100);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, currentTypeIndex, isDeleting]);

  const tick = () => {
    const currentWord = userTypes[currentTypeIndex];
    const fullWord = currentWord;

    if (!isDeleting && text === fullWord) {
      setIsDeleting(true);
      setDelta(100);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentTypeIndex((prev) => (prev + 1) % userTypes.length);
      setDelta(200);
      return;
    }

    const newText = isDeleting
      ? fullWord?.substring(0, text.length - 1) || ""
      : fullWord?.substring(0, text.length + 1) || "";

    setText(newText);
    setDelta(isDeleting ? 100 : 200);
  };

  return (
    <div
      className="min-h-screen bg-black font-sans text-white"
      style={{ letterSpacing: "-0.03em" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");
        body {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Roboto",
            "Oxygen",
            "Ubuntu",
            "Cantarell",
            "Fira Sans",
            "Droid Sans",
            "Helvetica Neue",
            sans-serif;
          font-weight: 700;
        }
      `}</style>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-black/85 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="./ziva-logo.svg" alt="Ziva Logo" className="size-16" />
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <Button
                    className="text-white hover:text-purple-400"
                    variant="ghost"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Get Started</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <>
                  <UserButton />
                  <Button
                    className="text-white hover:text-purple-400"
                    onClick={() => router.push("/mail")}
                  >
                    <Mail className="size-8" />{" "}
                    <ArrowRight className="size-8" />
                  </Button>
                </>
              </SignedIn>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="overflow-hidden pb-20 pt-32">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                  <span className="tracking-tighter text-purple-400">
                    ‘‘Smarter’’
                  </span>{" "}
                  email for{" "}
                  <span className="relative">
                    <span className="inline-block min-w-[200px] whitespace-nowrap tracking-tighter text-purple-400">
                      {text}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={text}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="ml-1 inline-block h-[1em] w-[3px] bg-purple-400"
                          style={{ verticalAlign: "middle" }}
                        />
                      </AnimatePresence>
                    </span>
                  </span>
                </h1>
                <p className="mb-8 text-xl tracking-tight text-gray-400 md:text-2xl">
                  Fly through your inbox and get back to doing great work with a
                  little help from AI.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button className="bg-purple-600 px-8 py-6 text-lg tracking-tight text-white hover:bg-purple-700">
                    Try Ziva Free
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-400 px-8 py-6 text-lg tracking-tight text-purple-400 hover:bg-purple-400/10"
                  >
                    Watch Demo
                    <Star className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mix-blend-screen"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brain-0BV14um2GFMU7gcbmgsDcmWqFKJfHx.png"
                    alt="AI Brain Illustration"
                    className="mx-auto w-full max-w-md"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-gradient-to-b from-black to-purple-900/20 py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Features that save you time
              </h2>
              <p className="text-xl tracking-tight text-gray-400">
                Ziva gives you an hour, everyday, for what matters most.
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Mail className="h-12 w-12 text-purple-400" />}
                title="Smart Categorization"
                description="AI-powered email sorting that learns your preferences"
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-purple-400" />}
                title="Quick Actions"
                description="One-click responses and task creation from your inbox"
              />
              <FeatureCard
                icon={<Clock className="h-12 w-12 text-purple-400" />}
                title="Scheduled Sending"
                description="Plan your emails and send them at the perfect time"
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="text-xl tracking-tight text-gray-400">
                Choose the plan that's right for you
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              <PricingCard
                title="Basic"
                price="Free"
                features={[
                  "Smart email categorization",
                  "5 AI-powered quick replies per day",
                  "1 GB storage",
                  "Limited to 100 emails per day",
                ]}
              />
              <PricingCard
                title="Pro"
                price="$9.99/mo"
                features={[
                  "Everything in Basic",
                  "Unlimited AI-powered quick replies",
                  "10 GB storage",
                  "Priority support",
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                features={[
                  "Everything in Pro",
                  "Unlimited storage",
                  "Advanced analytics",
                  "Dedicated account manager",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-purple-900/20 to-black py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl"
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to transform your inbox?
              </h2>
              <p className="mb-8 text-xl tracking-tight text-gray-400">
                Join thousands of creators, founders, and managers who have
                revolutionized their email workflow.
              </p>
              <Button className="bg-purple-600 px-8 py-6 text-lg tracking-tight text-white hover:bg-purple-700">
                Get Started Now
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LevQ7v88ZU2VGzTKqiKC85blZGjdo0.png"
                alt="Ziva Logo"
                style={{ objectFit: "contain" }}
                className="size-20"
              />
            </div>
            <p className="text-sm tracking-tight text-gray-400">
              © 2024 Ziva. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-purple-500/30 bg-purple-900/20 transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle className="text-center text-xl font-bold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center tracking-tight text-gray-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <Card
      className={`border-purple-500/30 bg-purple-900/20 ${highlighted ? "ring-2 ring-purple-400" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          {title}
        </CardTitle>
        <p className="text-center text-3xl font-bold tracking-tight text-purple-400">
          {price}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-purple-400" />
              <span className="tracking-tight text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`mt-6 w-full tracking-tight ${
            highlighted
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-purple-900/50 text-white hover:bg-purple-800/50"
          }`}
        >
          <span className="transition-all duration-300 hover:scale-105">
            {highlighted ? "Get Started" : "Choose Plan"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
