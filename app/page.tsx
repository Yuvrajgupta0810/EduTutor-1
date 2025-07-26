"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, BarChart } from "lucide-react"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { AnimatedCard } from "@/components/animated-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduTutor AI</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "How It Works", "Testimonials"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium hover:underline underline-offset-4 transition-all duration-200 hover:text-primary"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Link href="/login">
              <Button variant="outline" className="transition-all duration-200 hover:scale-105 bg-transparent">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="transition-all duration-200 hover:scale-105">Sign Up</Button>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="container flex flex-col items-center text-center relative z-10">
            <motion.div
              className="mb-8 relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src="/placeholder.svg?height=120&width=120&text=AI+brain+with+graduation+cap+icon"
                alt="EduTutor AI Logo"
                className="mx-auto h-20 w-20 mb-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Personalized Learning with{" "}
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                AI
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground max-w-[800px] mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              EduTutor AI adapts to your learning style, identifies knowledge gaps, and creates personalized quizzes to
              help you master any subject.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/signup?role=student">
                <Button size="lg" className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  Get Started as Student
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="/signup?role=educator">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Join as Educator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Platform Features
            </motion.h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI-Generated Quizzes",
                  description: "Our AI creates personalized quizzes based on your learning history and knowledge gaps.",
                },
                {
                  icon: BookOpen,
                  title: "Google Classroom Integration",
                  description: "Seamlessly sync your classes and subjects from Google Classroom.",
                },
                {
                  icon: BarChart,
                  title: "Performance Analytics",
                  description: "Track your progress with detailed analytics and personalized recommendations.",
                },
              ].map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <AnimatedCard delay={index * 0.1}>
                    <div className="bg-background p-6 rounded-lg shadow-sm border h-full">
                      <motion.div
                        className="mb-4 p-3 rounded-full bg-primary/10 w-fit"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <StaggerContainer>
                {[
                  {
                    step: 1,
                    title: "Sign Up & Connect",
                    description: "Create an account and connect your Google Classroom to sync your subjects.",
                  },
                  {
                    step: 2,
                    title: "Take Diagnostic Test",
                    description: "Complete an initial assessment to identify your strengths and weaknesses.",
                  },
                  {
                    step: 3,
                    title: "Get Personalized Quizzes",
                    description: "Receive AI-generated quizzes tailored to your learning needs.",
                  },
                  {
                    step: 4,
                    title: "Track Your Progress",
                    description: "Monitor your improvement and receive personalized recommendations.",
                  },
                ].map((item) => (
                  <StaggerItem key={item.step} className="flex gap-4">
                    <motion.div
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.step}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden border"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600&text=Student+using+AI+learning+platform+on+laptop+with+books+and+notes"
                  alt="Student learning with AI"
                  className="object-cover w-full h-full transition-transform duration-300"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What Our Users Say
            </motion.h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "High School Student",
                  avatar: "/placeholder.svg?height=40&width=40&text=Student+girl+with+books",
                  testimonial:
                    "EduTutor AI helped me improve my math scores by 20% in just two months. The personalized quizzes identified exactly what I needed to work on.",
                },
                {
                  name: "Michael Chen",
                  role: "Science Teacher",
                  avatar: "/placeholder.svg?height=40&width=40&text=Male+teacher+with+glasses",
                  testimonial:
                    "As an educator, I can now easily track my students' progress and identify areas where they need additional support. The analytics are incredibly helpful.",
                },
                {
                  name: "Aisha Patel",
                  role: "College Student",
                  avatar: "/placeholder.svg?height=40&width=40&text=College+student+with+laptop",
                  testimonial:
                    "The adaptive difficulty feature is amazing. As I improve, the questions get more challenging, which keeps me engaged and constantly learning.",
                },
              ].map((testimonial, index) => (
                <StaggerItem key={testimonial.name}>
                  <AnimatedCard delay={index * 0.1}>
                    <div className="bg-background p-6 rounded-lg shadow-sm border h-full">
                      <div className="flex items-center mb-4">
                        <motion.img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full mr-3"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{testimonial.testimonial}</p>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>

      <motion.footer
        className="border-t py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-bold">EduTutor AI</span>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, index) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4 md:mt-0 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            viewport={{ once: true }}
          >
            © 2025 EduTutor AI. All rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
