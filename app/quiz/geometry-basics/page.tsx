"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Clock, Home, Target } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const geometryQuizData = {
  id: "geometry-basics",
  title: "Geometry Basics",
  subject: "Mathematics",
  difficulty: "easy",
  timeLimit: 480, // 8 minutes
  questions: [
    {
      id: "1",
      text: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: "180°",
      explanation: "The sum of all interior angles in any triangle is always 180 degrees.",
    },
    {
      id: "2",
      text: "What is the area of a rectangle with length 8 and width 5?",
      options: ["13", "26", "40", "80"],
      correctAnswer: "40",
      explanation: "Area of rectangle = length × width = 8 × 5 = 40 square units.",
    },
    {
      id: "3",
      text: "How many sides does a hexagon have?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6",
      explanation: "A hexagon is a polygon with 6 sides and 6 angles.",
    },
    {
      id: "4",
      text: "What is the perimeter of a square with side length 7?",
      options: ["14", "21", "28", "49"],
      correctAnswer: "28",
      explanation: "Perimeter of square = 4 × side length = 4 × 7 = 28 units.",
    },
    {
      id: "5",
      text: "Which shape has all sides equal and all angles 90°?",
      options: ["Rectangle", "Rhombus", "Square", "Parallelogram"],
      correctAnswer: "Square",
      explanation: "A square has all four sides equal and all four angles are 90 degrees.",
    },
    {
      id: "6",
      text: "What is the circumference formula for a circle?",
      options: ["πr²", "2πr", "πd", "Both 2πr and πd"],
      correctAnswer: "Both 2πr and πd",
      explanation: "Circumference = 2πr (using radius) or πd (using diameter), both are correct.",
    },
  ],
}

export default function GeometryQuizPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(geometryQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(480)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
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
    if (currentQuestion < geometryQuizData.questions.length - 1) {
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
    geometryQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / geometryQuizData.questions.length) * 100)
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
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
              Loading Geometry Quiz
            </motion.h2>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="h-2 bg-green-500 rounded-full"
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = geometryQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / geometryQuizData.questions.length) * 100

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
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl">Geometry Quiz Complete!</CardTitle>
              <CardDescription>You've mastered the basics of geometry!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-4">{score}%</div>
                <div className="space-y-2">
                  <p>
                    Correct: {Math.round((score / 100) * geometryQuizData.questions.length)}/
                    {geometryQuizData.questions.length}
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
                <Target className="h-5 w-5 text-green-600" />
                <CardTitle>{geometryQuizData.title}</CardTitle>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <CardDescription>
              Question {currentQuestion + 1} of {geometryQuizData.questions.length}
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
              {currentQuestion < geometryQuizData.questions.length - 1 ? (
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
