"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Atom, CheckCircle, Clock, Home } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const periodicTableQuizData = {
  id: "periodic-table",
  title: "Periodic Table",
  subject: "Chemistry",
  difficulty: "easy",
  timeLimit: 480,
  questions: [
    {
      id: "1",
      text: "What is the chemical symbol for Hydrogen?",
      options: ["Hy", "H", "Hg", "He"],
      correctAnswer: "H",
      explanation: "Hydrogen is the first element in the periodic table with symbol H.",
    },
    {
      id: "2",
      text: "Which element has the atomic number 6?",
      options: ["Oxygen", "Carbon", "Nitrogen", "Boron"],
      correctAnswer: "Carbon",
      explanation: "Carbon has 6 protons, giving it atomic number 6.",
    },
    {
      id: "3",
      text: "What is the most abundant gas in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen",
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
    },
    {
      id: "4",
      text: "Which group contains the noble gases?",
      options: ["Group 1", "Group 17", "Group 18", "Group 2"],
      correctAnswer: "Group 18",
      explanation: "Group 18 contains the noble gases like Helium, Neon, Argon, etc.",
    },
    {
      id: "5",
      text: "What is the chemical symbol for Iron?",
      options: ["Ir", "Fe", "In", "I"],
      correctAnswer: "Fe",
      explanation: "Iron's symbol Fe comes from its Latin name 'ferrum'.",
    },
    {
      id: "6",
      text: "Which element is liquid at room temperature?",
      options: ["Mercury", "Bromine", "Both Mercury and Bromine", "Gallium"],
      correctAnswer: "Both Mercury and Bromine",
      explanation: "Mercury and Bromine are the only two elements that are liquid at room temperature.",
    },
  ],
}

export default function PeriodicTableQuizPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(periodicTableQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(480)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
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
    if (currentQuestion < periodicTableQuizData.questions.length - 1) {
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
    periodicTableQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / periodicTableQuizData.questions.length) * 100)
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
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Atom className="h-8 w-8 text-orange-600" />
              </div>
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
              Loading Periodic Table
            </motion.h2>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8 }}
              className="h-2 bg-orange-500 rounded-full"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = periodicTableQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / periodicTableQuizData.questions.length) * 100

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
                <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl">Chemistry Quiz Complete!</CardTitle>
              <CardDescription>You've mastered the periodic table elements!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-4">{score}%</div>
                <div className="space-y-2">
                  <p>
                    Elements Mastered: {Math.round((score / 100) * periodicTableQuizData.questions.length)}/
                    {periodicTableQuizData.questions.length}
                  </p>
                  <p>Time: {formatTime(480 - timeRemaining)}</p>
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
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Atom className="h-5 w-5 text-orange-600" />
                </motion.div>
                <CardTitle>{periodicTableQuizData.title}</CardTitle>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <CardDescription>
              Question {currentQuestion + 1} of {periodicTableQuizData.questions.length}
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
                  <h3 className="text-lg font-medium">{question.text}</h3>
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
              {currentQuestion < periodicTableQuizData.questions.length - 1 ? (
                <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting || !answers[currentQuestion]}>
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  )
}
