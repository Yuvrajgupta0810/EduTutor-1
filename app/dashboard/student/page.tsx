"use client"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Clock, LineChart, PlayCircle, Plus, Microscope, Scroll, Calculator } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { RecentQuizzes } from "@/components/recent-quizzes"
import { PerformanceChart } from "@/components/performance-chart"
import { MobileDashboardNav } from "@/components/mobile-dashboard-nav"
import { PageTransition } from "@/components/page-transition"
import { AnimatedCard } from "@/components/animated-card"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        <div className="md:hidden">
          <MobileDashboardNav />
        </div>
        <div className="container py-6">
          <motion.div
            className="flex flex-col gap-1 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your learning progress.</p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Courses Enrolled", value: "5", icon: BookOpen },
              { title: "Quizzes Completed", value: "23", icon: Brain },
              { title: "Study Time", value: "12.5 hrs", icon: Clock },
            ].map((stat, index) => (
              <StaggerItem key={stat.title}>
                <AnimatedCard delay={index * 0.1}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="transition-all duration-200">
                <TabsTrigger value="overview" className="transition-all duration-200">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="courses" className="transition-all duration-200">
                  Courses
                </TabsTrigger>
                <TabsTrigger value="performance" className="transition-all duration-200">
                  Performance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 pt-4">
                <AnimatedCard delay={0.1}>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Your overall progress across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { subject: "Mathematics", progress: 75 },
                        { subject: "Physics", progress: 60 },
                        { subject: "Chemistry", progress: 45 },
                        { subject: "Biology", progress: 80 },
                        { subject: "History", progress: 55 },
                      ].map((item, index) => (
                        <motion.div
                          key={item.subject}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">{item.subject}</div>
                            <div className="text-sm text-muted-foreground">{item.progress}%</div>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                          >
                            <Progress value={item.progress} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedCard delay={0.2}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recommended Quizzes</CardTitle>
                        <motion.img
                          src="/placeholder.svg?height=32&width=32&text=AI+recommendation+icon"
                          alt="AI Recommendations"
                          className="h-8 w-8"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                      </div>
                      <CardDescription>Based on your learning patterns and areas for improvement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Algebra Fundamentals",
                            subject: "Mathematics",
                            link: "/quiz/algebra-fundamentals",
                            icon: Brain,
                            color: "blue",
                          },
                          {
                            title: "Cell Biology",
                            subject: "Biology",
                            link: "/quiz/biology-cells",
                            icon: Microscope,
                            color: "green",
                          },
                          {
                            title: "Ancient Civilizations",
                            subject: "History",
                            link: "/quiz/world-history",
                            icon: Scroll,
                            color: "amber",
                          },
                          {
                            title: "Advanced Calculus",
                            subject: "Mathematics",
                            link: "/quiz/advanced-calculus",
                            icon: Calculator,
                            color: "purple",
                          },
                          {
                            title: "Chemical Reactions",
                            subject: "Chemistry",
                            link: "/quiz/chemical-reactions",
                            icon: Brain,
                            color: "red",
                          },
                          {
                            title: "Newton's Laws",
                            subject: "Physics",
                            link: "/quiz/newton-laws",
                            icon: Brain,
                            color: "indigo",
                          },
                        ].map((quiz, index) => (
                          <motion.div
                            key={quiz.title}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                className={`p-2 rounded-md bg-${quiz.color}-100 dark:bg-${quiz.color}-900/30`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <quiz.icon className={`h-4 w-4 text-${quiz.color}-600`} />
                              </motion.div>
                              <div>
                                <div className="font-medium">{quiz.title}</div>
                                <div className="text-sm text-muted-foreground">{quiz.subject}</div>
                              </div>
                            </div>
                            <Link href={quiz.link}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1 bg-transparent transition-all duration-200 hover:scale-105"
                              >
                                <PlayCircle className="h-4 w-4" />
                                Start
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </AnimatedCard>

                  <AnimatedCard delay={0.3}>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent learning activities and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: "Completed Calculus Quiz", subtitle: "Score: 85% • 2 days ago", color: "green" },
                          { title: "Started Biology Course", subtitle: "3 days ago", color: "blue" },
                          { title: "Diagnostic Test Completed", subtitle: "Physics • 5 days ago", color: "amber" },
                        ].map((activity, index) => (
                          <motion.div
                            key={activity.title}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className={`p-2 rounded-md bg-${activity.color}-100 dark:bg-${activity.color}-900`}>
                              <LineChart
                                className={`h-4 w-4 text-${activity.color}-600 dark:text-${activity.color}-300`}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground">{activity.subtitle}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </AnimatedCard>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="pt-4">
                <motion.div
                  className="flex justify-between items-center mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold">My Courses</h2>
                  <Button size="sm" className="gap-1 transition-all duration-200 hover:scale-105">
                    <Plus className="h-4 w-4" />
                    Add Course
                  </Button>
                </motion.div>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Algebra Fundamentals",
                      subject: "Mathematics",
                      progress: 75,
                      image: "/placeholder.svg?height=200&width=300&text=Algebra+equations",
                    },
                    {
                      title: "Chemical Reactions",
                      subject: "Chemistry",
                      progress: 45,
                      image: "/placeholder.svg?height=200&width=300&text=Chemistry+lab",
                    },
                    {
                      title: "Newton's Laws",
                      subject: "Physics",
                      progress: 60,
                      image: "/placeholder.svg?height=200&width=300&text=Physics+motion",
                    },
                    {
                      title: "Cell Biology",
                      subject: "Biology",
                      progress: 80,
                      image: "/placeholder.svg?height=200&width=300&text=Cell+structure",
                    },
                    {
                      title: "World History",
                      subject: "History",
                      progress: 30,
                      image: "/placeholder.svg?height=200&width=300&text=Ancient+civilizations",
                    },
                    {
                      title: "Advanced Calculus",
                      subject: "Mathematics",
                      progress: 15,
                      image: "/placeholder.svg?height=200&width=300&text=Calculus+formulas",
                    },
                  ].map((course, index) => (
                    <StaggerItem key={course.title}>
                      <CourseCard {...course} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </TabsContent>

              <TabsContent value="performance" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AnimatedCard delay={0.1} className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>Your quiz scores over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <PerformanceChart />
                      </div>
                    </CardContent>
                  </AnimatedCard>
                  <AnimatedCard delay={0.2}>
                    <CardHeader>
                      <CardTitle>Recent Quizzes</CardTitle>
                      <CardDescription>Your most recent quiz results</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentQuizzes />
                    </CardContent>
                  </AnimatedCard>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
