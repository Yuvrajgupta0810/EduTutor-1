"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock, Home } from "lucide-react"
import { QuizLoading } from "@/components/quiz-loading"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const algebraQuizData = {
  id: "algebra-fundamentals",
  title: "Algebra Fundamentals",
  subject: "Mathematics",
  difficulty: "medium",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "Solve for x: 2x + 5 = 13",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: "x = 4",
      explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4",
    },
    {
      id: "2",
      text: "What is the slope of the line y = 3x + 2?",
      options: ["2", "3", "5", "1"],
      correctAnswer: "3",
      explanation: "In the form y = mx + b, m is the slope. So the slope is 3.",
    },
    {
      id: "3",
      text: "Factor: x² - 9",
      options: ["(x-3)(x-3)", "(x+3)(x+3)", "(x-3)(x+3)", "Cannot be factored"],
      correctAnswer: "(x-3)(x+3)",
      explanation: "This is a difference of squares: x² - 9 = x² - 3² = (x-3)(x+3)",
    },
    {
      id: "4",
      text: "If f(x) = 2x + 1, what is f(3)?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      explanation: "f(3) = 2(3) + 1 = 6 + 1 = 7",
    },
    {
      id: "5",
      text: "Solve: 3x - 7 = 2x + 5",
      options: ["x = 10", "x = 11", "x = 12", "x = 13"],
      correctAnswer: "x = 12",
      explanation: "3x - 7 = 2x + 5, so 3x - 2x = 5 + 7, therefore x = 12",
    },
  ],
}

export default function AlgebraQuizPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(algebraQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Simulate loading
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
  }

  const handleNext = () => {
    if (currentQuestion < algebraQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    algebraQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / algebraQuizData.questions.length) * 100)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const finalScore = calculateScore()
      setScore(finalScore)
      setQuizCompleted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return <QuizLoading />
  }

  const question = algebraQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / algebraQuizData.questions.length) * 100

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
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                  <CardDescription>You've successfully completed the {algebraQuizData.title} quiz.</CardDescription>
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
                    <div className="text-5xl font-bold text-primary">{score}%</div>
                    <p className="text-muted-foreground mt-1">Your Score</p>
                  </motion.div>

                  <motion.div
                    className="space-y-2 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="flex justify-between text-sm">
                      <span>Questions Answered</span>
                      <span className="font-medium">
                        {answers.filter((a) => a).length}/{algebraQuizData.questions.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Correct Answers</span>
                      <span className="font-medium">
                        {Math.round((score / 100) * algebraQuizData.questions.length)}/
                        {algebraQuizData.questions.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time Taken</span>
                      <span className="font-medium">{formatTime(600 - timeRemaining)}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-lg bg-muted p-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <h3 className="font-medium mb-2">Performance Analysis</h3>
                    <div className="space-y-2">
                      {score >= 80 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Excellent understanding of algebra fundamentals!</span>
                        </div>
                      )}
                      {score >= 60 && score < 80 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Good progress! Review factoring and equation solving.</span>
                        </div>
                      )}
                      {score < 60 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-sm">Need more practice with basic algebraic operations.</span>
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
                      setAnswers(Array(algebraQuizData.questions.length).fill(""))
                      setTimeRemaining(600)
                    }}
                  >
                    Retake Quiz
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
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>{algebraQuizData.title}</CardTitle>
                </div>
                <motion.div
                  className="flex items-center gap-1 text-sm font-medium"
                  animate={{
                    color: timeRemaining < 60 ? "#ef4444" : "inherit",
                    scale: timeRemaining < 60 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: timeRemaining < 60 ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </motion.div>
              </div>
              <CardDescription>
                {algebraQuizData.subject} • Question {currentQuestion + 1} of {algebraQuizData.questions.length}
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
                      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
                    </div>
                    <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                      {question.options.map((option, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
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
                {currentQuestion < algebraQuizData.questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    Next
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
                        <Brain className="h-4 w-4" />
                      </motion.div>
                    ) : null}
                    {isSubmitting ? "Submitting..." : "Submit Quiz"}
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
