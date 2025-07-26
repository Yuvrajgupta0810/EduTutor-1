"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Code, CheckCircle, Clock, Home } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const programmingQuizData = {
  id: "programming-basics",
  title: "Programming Basics",
  subject: "Computer Science",
  difficulty: "easy",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: "Hyper Text Markup Language",
      explanation: "HTML stands for Hyper Text Markup Language, used for creating web pages.",
    },
    {
      id: "2",
      text: "Which of these is a programming language?",
      options: ["HTML", "CSS", "JavaScript", "All of the above"],
      correctAnswer: "JavaScript",
      explanation: "JavaScript is a programming language, while HTML and CSS are markup and styling languages.",
    },
    {
      id: "3",
      text: "What is a variable in programming?",
      options: ["A fixed value", "A container for storing data", "A type of loop", "A function"],
      correctAnswer: "A container for storing data",
      explanation: "A variable is a container that stores data values that can be changed during program execution.",
    },
    {
      id: "4",
      text: "What does 'if' statement do in programming?",
      options: ["Repeats code", "Makes decisions", "Stores data", "Prints output"],
      correctAnswer: "Makes decisions",
      explanation: "An 'if' statement is used for conditional execution - making decisions in code.",
    },
    {
      id: "5",
      text: "What is a loop in programming?",
      options: ["A bug in code", "A way to repeat code", "A data type", "A variable"],
      correctAnswer: "A way to repeat code",
      explanation: "A loop is a programming construct that repeats a block of code multiple times.",
    },
    {
      id: "6",
      text: "What is debugging?",
      options: ["Writing new code", "Finding and fixing errors", "Running code", "Saving code"],
      correctAnswer: "Finding and fixing errors",
      explanation: "Debugging is the process of finding and fixing errors (bugs) in computer programs.",
    },
  ],
}

export default function ProgrammingQuizPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(programmingQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
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
    if (currentQuestion < programmingQuizData.questions.length - 1) {
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
    programmingQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / programmingQuizData.questions.length) * 100)
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Code className="h-8 w-8 text-emerald-600" />
              </div>
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
              Initializing Code Editor
            </motion.h2>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-2 bg-emerald-500 rounded-full"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = programmingQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / programmingQuizData.questions.length) * 100

  if (quizCompleted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mx-auto mb-4"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl">Programming Quiz Complete!</CardTitle>
              <CardDescription>You've learned the basics of programming!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-600 mb-4">{score}%</div>
                <div className="space-y-2">
                  <p>
                    Concepts Mastered: {Math.round((score / 100) * programmingQuizData.questions.length)}/
                    {programmingQuizData.questions.length}
                  </p>
                  <p>Time: {formatTime(600 - timeRemaining)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Link href="/dashboard/student" className="w-full">
                <Button className="w-full gap-2">
                  <Home className="h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Link href="/dashboard/student/quizzes">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Code className="h-5 w-5 text-emerald-600" />
                </motion.div>
                <CardTitle>{programmingQuizData.title}</CardTitle>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <CardDescription>
              Question {currentQuestion + 1} of {programmingQuizData.questions.length}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
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
                  <h3 className="text-lg font-medium font-mono">{question.text}</h3>
                  <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                    {question.options.map((option, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer"
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
              className="bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <div className="flex gap-2">
              {currentQuestion < programmingQuizData.questions.length - 1 ? (
                <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting || !answers[currentQuestion]}>
                  {isSubmitting ? "Compiling..." : "Submit Code"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  )
}
