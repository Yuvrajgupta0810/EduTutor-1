"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock, Home, Microscope } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const biologyQuizData = {
  id: "biology-cells",
  title: "Cell Biology Fundamentals",
  subject: "Biology",
  difficulty: "medium",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correctAnswer: "Mitochondria",
      explanation:
        "Mitochondria are called the powerhouse of the cell because they produce ATP, the cell's energy currency.",
      image: "/placeholder.svg?height=200&width=300&text=Mitochondria+structure+diagram",
    },
    {
      id: "2",
      text: "Which organelle is responsible for protein synthesis?",
      options: ["Golgi Apparatus", "Lysosome", "Ribosome", "Vacuole"],
      correctAnswer: "Ribosome",
      explanation: "Ribosomes are the cellular structures responsible for protein synthesis by translating mRNA.",
      image: "/placeholder.svg?height=200&width=300&text=Ribosome+protein+synthesis",
    },
    {
      id: "3",
      text: "What surrounds and protects the cell?",
      options: ["Cell Wall", "Cell Membrane", "Cytoplasm", "Nuclear Envelope"],
      correctAnswer: "Cell Membrane",
      explanation:
        "The cell membrane (plasma membrane) surrounds all cells and controls what enters and exits the cell.",
      image: "/placeholder.svg?height=200&width=300&text=Cell+membrane+structure",
    },
    {
      id: "4",
      text: "Where is genetic material stored in eukaryotic cells?",
      options: ["Cytoplasm", "Mitochondria", "Nucleus", "Ribosome"],
      correctAnswer: "Nucleus",
      explanation: "In eukaryotic cells, DNA is stored in the nucleus, which is surrounded by a nuclear envelope.",
      image: "/placeholder.svg?height=200&width=300&text=Cell+nucleus+with+DNA",
    },
    {
      id: "5",
      text: "What process do plants use to make their own food?",
      options: ["Cellular Respiration", "Photosynthesis", "Fermentation", "Glycolysis"],
      correctAnswer: "Photosynthesis",
      explanation:
        "Photosynthesis is the process by which plants convert sunlight, CO2, and water into glucose and oxygen.",
      image: "/placeholder.svg?height=200&width=300&text=Photosynthesis+process+diagram",
    },
  ],
}

export default function BiologyQuizPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(biologyQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
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

    // Show explanation for a moment
    setShowExplanation(true)
    setTimeout(() => setShowExplanation(false), 3000)
  }

  const handleNext = () => {
    if (currentQuestion < biologyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    biologyQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / biologyQuizData.questions.length) * 100)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const finalScore = calculateScore()
      setScore(finalScore)
      setQuizCompleted(true)
      setIsSubmitting(false)
    }, 2000)
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
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Microscope className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              Preparing Biology Quiz
            </motion.h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-2 bg-green-500 rounded-full"
              />
              <div className="flex justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span>Loading cellular structures...</span>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = biologyQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / biologyQuizData.questions.length) * 100

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
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Microscope className="h-6 w-6 text-green-500" />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardTitle className="text-2xl">Biology Quiz Completed!</CardTitle>
                  <CardDescription>You've mastered the fundamentals of cell biology!</CardDescription>
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
                    <div className="text-5xl font-bold text-green-600">{score}%</div>
                    <p className="text-muted-foreground mt-1">Your Score</p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div>
                      <div className="text-2xl font-bold text-primary">{answers.filter((a) => a).length}</div>
                      <div className="text-xs text-muted-foreground">Answered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round((score / 100) * biologyQuizData.questions.length)}
                      </div>
                      <div className="text-xs text-muted-foreground">Correct</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{formatTime(600 - timeRemaining)}</div>
                      <div className="text-xs text-muted-foreground">Time</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">🧬 Biology Mastery</h3>
                    <div className="space-y-2">
                      {score >= 80 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm text-green-700 dark:text-green-400">
                            Excellent understanding of cellular structures!
                          </span>
                        </div>
                      )}
                      {score >= 60 && score < 80 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-sm text-amber-700 dark:text-amber-400">
                            Good grasp! Review organelle functions and processes.
                          </span>
                        </div>
                      )}
                      {score < 60 && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-sm text-red-700 dark:text-red-400">
                            Study cell structure and basic biological processes.
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
                      setAnswers(Array(biologyQuizData.questions.length).fill(""))
                      setTimeRemaining(600)
                      setIsLoading(true)
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
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Microscope className="h-5 w-5 text-green-600" />
                  </motion.div>
                  <CardTitle>{biologyQuizData.title}</CardTitle>
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
                {biologyQuizData.subject} • Question {currentQuestion + 1} of {biologyQuizData.questions.length}
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
                            alt="Question illustration"
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
                              ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
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
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <AnimatePresence>
                      {showExplanation && answers[currentQuestion] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-4"
                        >
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Explanation</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-400">{question.explanation}</p>
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
                Previous
              </Button>
              <div className="flex gap-2">
                {currentQuestion < biologyQuizData.questions.length - 1 ? (
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
                        <Microscope className="h-4 w-4" />
                      </motion.div>
                    ) : null}
                    {isSubmitting ? "Analyzing..." : "Submit Quiz"}
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
