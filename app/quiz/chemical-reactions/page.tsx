"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock, Home } from "lucide-react"
import Link from "next/link"

const chemistryQuizData = {
  id: "chemical-reactions",
  title: "Chemical Reactions",
  subject: "Chemistry",
  difficulty: "medium",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "What type of reaction is: 2H₂ + O₂ → 2H₂O?",
      options: ["Decomposition", "Synthesis", "Single replacement", "Double replacement"],
      correctAnswer: "Synthesis",
      explanation: "This is a synthesis reaction where two or more reactants combine to form one product.",
    },
    {
      id: "2",
      text: "Balance the equation: __Al + __O₂ → __Al₂O₃",
      options: ["4, 3, 2", "2, 3, 1", "1, 1, 1", "3, 2, 1"],
      correctAnswer: "4, 3, 2",
      explanation: "4Al + 3O₂ → 2Al₂O₃ is the balanced equation.",
    },
    {
      id: "3",
      text: "What is produced when an acid reacts with a base?",
      options: ["Salt only", "Water only", "Salt and water", "Gas"],
      correctAnswer: "Salt and water",
      explanation: "Acid + Base → Salt + Water (neutralization reaction)",
    },
    {
      id: "4",
      text: "Which factor does NOT affect reaction rate?",
      options: ["Temperature", "Concentration", "Color of reactants", "Surface area"],
      correctAnswer: "Color of reactants",
      explanation: "Color is a physical property that doesn't affect how fast a reaction occurs.",
    },
    {
      id: "5",
      text: "What is the pH of a neutral solution?",
      options: ["0", "7", "14", "1"],
      correctAnswer: "7",
      explanation: "A neutral solution has equal H⁺ and OH⁻ ions, giving a pH of 7.",
    },
  ],
}

export default function ChemistryQuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(chemistryQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeRemaining, quizCompleted])

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < chemistryQuizData.questions.length - 1) {
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
    chemistryQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / chemistryQuizData.questions.length) * 100)
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

  const question = chemistryQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / chemistryQuizData.questions.length) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 relative">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>You've successfully completed the {chemistryQuizData.title} quiz.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">{score}%</div>
                <p className="text-muted-foreground mt-1">Your Score</p>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Questions Answered</span>
                  <span className="font-medium">
                    {answers.filter((a) => a).length}/{chemistryQuizData.questions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Correct Answers</span>
                  <span className="font-medium">
                    {Math.round((score / 100) * chemistryQuizData.questions.length)}/
                    {chemistryQuizData.questions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Taken</span>
                  <span className="font-medium">{formatTime(600 - timeRemaining)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4 mt-6">
                <h3 className="font-medium mb-2">Performance Analysis</h3>
                <div className="space-y-2">
                  {score >= 80 && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Excellent grasp of chemical reactions!</span>
                    </div>
                  )}
                  {score >= 60 && score < 80 && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Good progress! Review balancing equations and reaction types.</span>
                    </div>
                  )}
                  {score < 60 && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-sm">Focus on basic reaction concepts and equation balancing.</span>
                    </div>
                  )}
                </div>
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
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setQuizCompleted(false)
                setCurrentQuestion(0)
                setAnswers(Array(chemistryQuizData.questions.length).fill(""))
                setTimeRemaining(600)
              }}
            >
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link href="/dashboard/student">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>{chemistryQuizData.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span className={timeRemaining < 60 ? "text-red-500" : ""}>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <CardDescription>
            {chemistryQuizData.subject} • Question {currentQuestion + 1} of {chemistryQuizData.questions.length}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.text}</h3>
            </div>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion < chemistryQuizData.questions.length - 1 ? (
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
  )
}
