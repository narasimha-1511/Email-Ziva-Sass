'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Star, Mail, Zap, Clock, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const userTypes = ["  Creators", "  Founders", "  Managers"]

export default function Component() {
  const [scrolled, setScrolled] = useState(false)
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")
  const [delta, setDelta] = useState(200 - Math.random() * 100)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, delta)

    return () => clearInterval(ticker)
  }, [text, currentTypeIndex, isDeleting])

  const tick = () => {
    const currentWord = userTypes[currentTypeIndex]
    const fullWord = currentWord
    
    if (!isDeleting && text === fullWord) {
      setIsDeleting(true)
      setDelta(100)
      return
    }

    if (isDeleting && text === "") {
      setIsDeleting(false)
      setCurrentTypeIndex((prev) => (prev + 1) % userTypes.length)
      setDelta(200)
      return
    }

    const newText = isDeleting
      ? fullWord?.substring(0, text.length - 1) || ""
      : fullWord?.substring(0, text.length + 1) || ""
    
    setText(newText)
    setDelta(isDeleting ? 100 : 200)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans" style={{ letterSpacing: '-0.03em' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          font-weight: 700;
        }
      `}</style>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="./ziva-logo.png"
                alt="Ziva Logo"
                className="size-16"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-purple-400">Sign In</Button>
              <Button className="bg-white text-black hover:bg-purple-100">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-purple-400 tracking-tighter">‘‘Smarter’’</span> email  for{" "}
                  <span className="relative">
                    <span className="text-purple-400 tracking-tighter whitespace-nowrap  inline-block min-w-[200px]">
                      {text}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={text}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="inline-block w-[3px] h-[1em] bg-purple-400 ml-1"
                          style={{ verticalAlign: 'middle' }}
                        />
                      </AnimatePresence>
                    </span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-8 tracking-tight">
                  Fly through your inbox and get back to doing great work with a little help from AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg tracking-tight">
                    Try Ziva Free
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-6 text-lg tracking-tight">
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl" />
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative mix-blend-screen"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brain-0BV14um2GFMU7gcbmgsDcmWqFKJfHx.png"
                    alt="AI Brain Illustration"
                    className="w-full max-w-md mx-auto"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gradient-to-b from-black to-purple-900/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Features that save you time
              </h2>
              <p className="text-xl text-gray-400 tracking-tight">
                Ziva gives you an hour, everyday, for what matters most.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Mail className="w-12 h-12 text-purple-400" />}
                title="Smart Categorization"
                description="AI-powered email sorting that learns your preferences"
              />
              <FeatureCard
                icon={<Zap className="w-12 h-12 text-purple-400" />}
                title="Quick Actions"
                description="One-click responses and task creation from your inbox"
              />
              <FeatureCard
                icon={<Clock className="w-12 h-12 text-purple-400" />}
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-400 tracking-tight">
                Choose the plan that's right for you
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price="Free"
                features={[
                  "Smart email categorization",
                  "5 AI-powered quick replies per day",
                  "1 GB storage"
                ]}
              />
              <PricingCard
                title="Pro"
                price="$9.99/mo"
                features={[
                  "Everything in Basic",
                  "Unlimited AI-powered quick replies",
                  "10 GB storage",
                  "Priority support"
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
                  "Dedicated account manager"
                ]}
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-purple-900/20 to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to transform your inbox?</h2>
              <p className="text-xl text-gray-400 mb-8 tracking-tight">
                Join thousands of creators, founders, and managers who have revolutionized their email workflow.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg tracking-tight">
                Get Started Now
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LevQ7v88ZU2VGzTKqiKC85blZGjdo0.png"
                alt="Ziva Logo"
                className="h-6"
              />
            </div>
            <p className="text-gray-400 text-sm tracking-tight">
              © 2024 Ziva. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-purple-900/20 border-purple-500/30">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-bold text-center tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-300 tracking-tight">{description}</p>
      </CardContent>
    </Card>
  )
}

function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <Card className={`bg-purple-900/20 border-purple-500/30 ${highlighted ? "ring-2 ring-purple-400" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center tracking-tight">{title}</CardTitle>
        <p className="text-3xl font-bold text-center text-purple-400 tracking-tight">{price}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
              <span className="text-gray-300 tracking-tight">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className={`w-full mt-6 tracking-tight ${
          highlighted ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-900/50 text-white hover:bg-purple-800/50"
        }`}>
          {highlighted ? "Get Started" : "Choose Plan"}
        </Button>
      </CardContent>
    </Card>
  )
}