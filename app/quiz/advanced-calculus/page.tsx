"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock, Home, Calculator, Zap, Target } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const calculusQuizData = {
  id: "advanced-calculus",
  title: "Advanced Calculus",
  subject: "Mathematics",
  difficulty: "hard",
  timeLimit: 900, // 15 minutes for advanced quiz
  questions: [
    {
      id: "1",
      text: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
      options: ["3x² + 4x - 5", "3x² + 2x - 5", "x² + 4x - 5", "3x² + 4x + 5"],
      correctAnswer: "3x² + 4x - 5",
      explanation: "Using the power rule: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(3) = 0",
      difficulty: "medium",
      concept: "Derivatives",
    },
    {
      id: "2",
      text: "Evaluate ∫(2x + 1)dx",
      options: ["x² + x + C", "2x² + x + C", "x² + 2x + C", "2x + C"],
      correctAnswer: "x² + x + C",
      explanation: "∫2x dx = x² and ∫1 dx = x, so ∫(2x + 1)dx = x² + x + C",
      difficulty: "medium",
      concept: "Integration",
    },
    {
      id: "3",
      text: "Find the limit: lim(x→0) (sin x)/x",
      options: ["0", "1", "∞", "undefined"],
      correctAnswer: "1",
      explanation: "This is a fundamental limit in calculus. lim(x→0) (sin x)/x = 1",
      difficulty: "hard",
      concept: "Limits",
    },
    {
      id: "4",
      text: "What is the second derivative of f(x) = e^(2x)?",
      options: ["2e^(2x)", "4e^(2x)", "e^(2x)", "2xe^(2x)"],
      correctAnswer: "4e^(2x)",
      explanation: "f'(x) = 2e^(2x), then f''(x) = 4e^(2x) using the chain rule twice",
      difficulty: "hard",
      concept: "Higher Derivatives",
    },
    {
      id: "5",
      text: "Evaluate ∫₀¹ x² dx",
      options: ["1/3", "1/2", "1", "2/3"],
      correctAnswer: "1/3",
      explanation: "∫x² dx = x³/3, so ∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3",
      difficulty: "hard",
      concept: "Definite Integration",
    },
  ],
}

const difficultyColors = {
  easy: "green",
  medium: "amber",
  hard: "red",
}

const conceptIcons = {
  Derivatives: Calculator,
  Integration: Target,
  Limits: Zap,
  "Higher Derivatives": Brain,
  "Definite Integration": CheckCircle,
}

export default function CalculusQuizPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(calculusQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(900)
  const [score, setScore] = useState(0)
  const [showWorkingArea, setShowWorkingArea] = useState(false)
  const [confidenceLevel, setConfidenceLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeRemaining, quizCompleted, isLoading])

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)

    // Simulate confidence calculation
    const randomConfidence = Math.floor(Math.random() * 40) + 60
    setConfidenceLevel(randomConfidence)

    setShowWorkingArea(true)
    setTimeout(() => setShowWorkingArea(false), 5000)
  }

  const handleNext = () => {
    if (currentQuestion < calculusQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowWorkingArea(false)
      setConfidenceLevel(0)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowWorkingArea(false)
      setConfidenceLevel(0)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    calculusQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / calculusQuizData.questions.length) * 100)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const finalScore = calculateScore()
      setScore(finalScore)
      setQuizCompleted(true)
      setIsSubmitting(false)
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              Initializing Calculus Engine
            </motion.h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-2 bg-blue-500 rounded-full"
              />
              <div className="flex justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span>Loading advanced mathematics...</span>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = calculusQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / calculusQuizData.questions.length) * 100
  const difficultyColor = difficultyColors[question.difficulty as keyof typeof difficultyColors]
  const ConceptIcon = conceptIcons[question.concept as keyof typeof conceptIcons] || Calculator

  if (quizCompleted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Card className="w-full max-w-2xl">
              <CardHeader className="text-center">
                <motion.div
                  className="mx-auto mb-4 relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                >
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Calculator className="h-6 w-6 text-blue-500" />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardTitle className="text-2xl">Calculus Mastery Achieved!</CardTitle>
                  <CardDescription>You've conquered advanced mathematical concepts!</CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  >
                    <div className="text-5xl font-bold text-blue-600">{score}%</div>
                    <p className="text-muted-foreground mt-1">Mathematical Precision</p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <Calculator className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-bold">
                        {Math.round((score / 100) * calculusQuizData.questions.length)}
                      </div>
                      <div className="text-xs text-muted-foreground">Solved</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                      <Target className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-bold">
                        {score >= 80 ? "Expert" : score >= 60 ? "Advanced" : "Learning"}
                      </div>
                      <div className="text-xs text-muted-foreground">Level</div>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                      <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                      <div className="text-lg font-bold">{formatTime(900 - timeRemaining)}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Mathematical Achievement
                    </h3>
                    <div className="space-y-2">
                      {score >= 80 && (
                        <div className="flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-700 dark:text-blue-400">
                            Calculus Master! You have exceptional mathematical reasoning skills!
                          </span>
                        </div>
                      )}
                      {score >= 60 && score < 80 && (
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-700 dark:text-blue-400">
                            Strong foundation! Review integration techniques and limit theorems.
                          </span>
                        </div>
                      )}
                      {score < 60 && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-700 dark:text-blue-400">
                            Keep practicing! Focus on fundamental calculus concepts and problem-solving.
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <Link href="/dashboard/student" className="w-full">
                    <Button className="w-full gap-2 transition-all duration-200 hover:scale-105">
                      <Home className="h-4 w-4" />
                      Return to Dashboard
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setQuizCompleted(false)
                      setCurrentQuestion(0)
                      setAnswers(Array(calculusQuizData.questions.length).fill(""))
                      setTimeRemaining(900)
                      setIsLoading(true)
                    }}
                  >
                    Challenge Again
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Link href="/dashboard/student">
                    <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <ConceptIcon className="h-5 w-5 text-blue-600" />
                  </motion.div>
                  <CardTitle>{calculusQuizData.title}</CardTitle>
                </div>
                <motion.div
                  className="flex items-center gap-1 text-sm font-medium"
                  animate={{
                    color: timeRemaining < 120 ? "#ef4444" : "inherit",
                    scale: timeRemaining < 120 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: timeRemaining < 120 ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </motion.div>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>
                  {calculusQuizData.subject} • Question {currentQuestion + 1} of {calculusQuizData.questions.length}
                </span>
                <motion.div
                  className={`px-2 py-1 rounded-full text-xs bg-${difficultyColor}-100 text-${difficultyColor}-700 dark:bg-${difficultyColor}-900/30 dark:text-${difficultyColor}-300`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {question.difficulty}
                </motion.div>
                <motion.div
                  className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {question.concept}
                </motion.div>
              </CardDescription>
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
                <Progress value={progress} className="mt-2" />
              </motion.div>
            </CardHeader>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 font-mono">{question.text}</h3>
                    </div>
                    <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                      {question.options.map((option, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all duration-200 font-mono ${
                            answers[currentQuestion] === option
                              ? `bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800`
                              : "hover:bg-muted/50"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                          {answers[currentQuestion] === option && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                              <Calculator className="h-4 w-4 text-blue-600" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <AnimatePresence>
                      {showWorkingArea && answers[currentQuestion] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3"
                        >
                          <motion.div
                            className="rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="flex items-start gap-2">
                              <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Solution Method</h4>
                                <p className="text-sm text-blue-700 dark:text-blue-400 font-mono">
                                  {question.explanation}
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {confidenceLevel > 0 && (
                            <motion.div
                              className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-3"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                                  AI Confidence Level
                                </span>
                                <span className="text-sm font-bold text-green-600">{confidenceLevel}%</span>
                              </div>
                              <motion.div
                                className="h-2 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.5 }}
                              >
                                <motion.div
                                  className="h-full bg-green-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${confidenceLevel}%` }}
                                  transition={{ delay: 0.2, duration: 0.8 }}
                                />
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <div className="flex gap-2">
                {currentQuestion < calculusQuizData.questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    Next Problem
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !answers[currentQuestion]}
                    className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Calculator className="h-4 w-4" />
                      </motion.div>
                    ) : null}
                    {isSubmitting ? "Computing..." : "Submit Solutions"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
