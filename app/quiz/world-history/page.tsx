"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock, Home, Scroll, Crown, Swords } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const historyQuizData = {
  id: "world-history",
  title: "Ancient Civilizations",
  subject: "History",
  difficulty: "medium",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "Which ancient civilization built the pyramids of Giza?",
      options: ["Mesopotamians", "Egyptians", "Greeks", "Romans"],
      correctAnswer: "Egyptians",
      explanation:
        "The ancient Egyptians built the pyramids of Giza around 2580-2510 BCE during the Fourth Dynasty of the Old Kingdom.",
      image: "/placeholder.svg?height=200&width=300&text=Egyptian+pyramids+at+Giza",
      era: "Ancient Egypt",
    },
    {
      id: "2",
      text: "Who was the first emperor of Rome?",
      options: ["Julius Caesar", "Augustus", "Nero", "Trajan"],
      correctAnswer: "Augustus",
      explanation:
        "Augustus (originally named Octavian) became the first Roman Emperor in 27 BCE, marking the end of the Roman Republic.",
      image: "/placeholder.svg?height=200&width=300&text=Augustus+Roman+emperor+statue",
      era: "Roman Empire",
    },
    {
      id: "3",
      text: "Which river valley is considered the cradle of civilization?",
      options: ["Nile Valley", "Indus Valley", "Mesopotamia", "Yellow River"],
      correctAnswer: "Mesopotamia",
      explanation:
        "Mesopotamia, between the Tigris and Euphrates rivers, is often called the cradle of civilization where the first cities emerged.",
      image: "/placeholder.svg?height=200&width=300&text=Mesopotamian+civilization+map",
      era: "Ancient Mesopotamia",
    },
    {
      id: "4",
      text: "What was the primary writing system of ancient Egypt?",
      options: ["Cuneiform", "Hieroglyphics", "Phoenician", "Linear A"],
      correctAnswer: "Hieroglyphics",
      explanation:
        "Hieroglyphics was the formal writing system used in ancient Egypt, consisting of pictographic and ideographic elements.",
      image: "/placeholder.svg?height=200&width=300&text=Egyptian+hieroglyphics+on+stone",
      era: "Ancient Egypt",
    },
    {
      id: "5",
      text: "Which Greek philosopher taught Alexander the Great?",
      options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
      correctAnswer: "Aristotle",
      explanation:
        "Aristotle was hired by Philip II of Macedon to tutor his son Alexander, who later became Alexander the Great.",
      image: "/placeholder.svg?height=200&width=300&text=Aristotle+teaching+Alexander+the+Great",
      era: "Ancient Greece",
    },
  ],
}

const eraIcons = {
  "Ancient Egypt": Crown,
  "Roman Empire": Swords,
  "Ancient Mesopotamia": Scroll,
  "Ancient Greece": Brain,
}

const eraColors = {
  "Ancient Egypt": "amber",
  "Roman Empire": "red",
  "Ancient Mesopotamia": "blue",
  "Ancient Greece": "purple",
}

export default function HistoryQuizPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(historyQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [score, setScore] = useState(0)
  const [showTimeline, setShowTimeline] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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

    // Show timeline for a moment
    setShowTimeline(true)
    setTimeout(() => setShowTimeline(false), 4000)
  }

  const handleNext = () => {
    if (currentQuestion < historyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowTimeline(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowTimeline(false)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    historyQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / historyQuizData.questions.length) * 100)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const finalScore = calculateScore()
      setScore(finalScore)
      setQuizCompleted(true)
      setIsSubmitting(false)
    }, 2500)
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
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Scroll className="h-8 w-8 text-amber-600" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              Traveling Through Time
            </motion.h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-2 bg-amber-500 rounded-full"
              />
              <div className="flex justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span>Loading ancient civilizations...</span>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = historyQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / historyQuizData.questions.length) * 100
  const EraIcon = eraIcons[question.era as keyof typeof eraIcons] || Scroll
  const eraColor = eraColors[question.era as keyof typeof eraColors] || "amber"

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
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-8 w-8 text-amber-600" />
                  </div>
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Crown className="h-6 w-6 text-amber-500" />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardTitle className="text-2xl">History Quest Complete!</CardTitle>
                  <CardDescription>You've journeyed through ancient civilizations!</CardDescription>
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
                    <div className="text-5xl font-bold text-amber-600">{score}%</div>
                    <p className="text-muted-foreground mt-1">Historical Knowledge</p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                      <Crown className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">
                        {Math.round((score / 100) * historyQuizData.questions.length)}
                      </div>
                      <div className="text-xs text-muted-foreground">Civilizations Mastered</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">{formatTime(600 - timeRemaining)}</div>
                      <div className="text-xs text-muted-foreground">Time Traveled</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                      <Scroll className="h-4 w-4" />
                      Historical Achievement
                    </h3>
                    <div className="space-y-2">
                      {score >= 80 && (
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-500" />
                          <span className="text-sm text-amber-700 dark:text-amber-400">
                            Master Historian! You have excellent knowledge of ancient civilizations!
                          </span>
                        </div>
                      )}
                      {score >= 60 && score < 80 && (
                        <div className="flex items-center gap-2">
                          <Swords className="h-4 w-4 text-amber-500" />
                          <span className="text-sm text-amber-700 dark:text-amber-400">
                            Good explorer! Review key dates and important figures.
                          </span>
                        </div>
                      )}
                      {score < 60 && (
                        <div className="flex items-center gap-2">
                          <Scroll className="h-4 w-4 text-amber-500" />
                          <span className="text-sm text-amber-700 dark:text-amber-400">
                            Keep studying! Focus on major civilizations and their contributions.
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
                      setAnswers(Array(historyQuizData.questions.length).fill(""))
                      setTimeRemaining(600)
                      setIsLoading(true)
                    }}
                  >
                    Explore Again
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
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <EraIcon className={`h-5 w-5 text-${eraColor}-600`} />
                  </motion.div>
                  <CardTitle>{historyQuizData.title}</CardTitle>
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
              <CardDescription className="flex items-center gap-2">
                <span>
                  {historyQuizData.subject} • Question {currentQuestion + 1} of {historyQuizData.questions.length}
                </span>
                <motion.div
                  className={`px-2 py-1 rounded-full text-xs bg-${eraColor}-100 text-${eraColor}-700 dark:bg-${eraColor}-900/30 dark:text-${eraColor}-300`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {question.era}
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
                      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
                      {question.image && (
                        <motion.div
                          className="my-4 rounded-md overflow-hidden border"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <img
                            src={question.image || "/placeholder.svg"}
                            alt="Historical illustration"
                            className="w-full object-cover transition-transform duration-300"
                          />
                        </motion.div>
                      )}
                    </div>
                    <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                      {question.options.map((option, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all duration-200 ${
                            answers[currentQuestion] === option
                              ? `bg-${eraColor}-50 border-${eraColor}-200 dark:bg-${eraColor}-900/30 dark:border-${eraColor}-800`
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
                              <EraIcon className={`h-4 w-4 text-${eraColor}-600`} />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <AnimatePresence>
                      {showTimeline && answers[currentQuestion] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`rounded-lg bg-${eraColor}-50 dark:bg-${eraColor}-900/30 border border-${eraColor}-200 dark:border-${eraColor}-800 p-4`}
                        >
                          <div className="flex items-start gap-2">
                            <Scroll className={`h-4 w-4 text-${eraColor}-600 mt-0.5`} />
                            <div>
                              <h4 className={`font-medium text-${eraColor}-800 dark:text-${eraColor}-300 mb-1`}>
                                Historical Context
                              </h4>
                              <p className={`text-sm text-${eraColor}-700 dark:text-${eraColor}-400`}>
                                {question.explanation}
                              </p>
                            </div>
                          </div>
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
                Previous Era
              </Button>
              <div className="flex gap-2">
                {currentQuestion < historyQuizData.questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    Next Era
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
                        <Scroll className="h-4 w-4" />
                      </motion.div>
                    ) : null}
                    {isSubmitting ? "Recording History..." : "Complete Quest"}
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
