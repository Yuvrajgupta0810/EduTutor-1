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

const physicsQuizData = {
  id: "newton-laws",
  title: "Newton's Laws",
  subject: "Physics",
  difficulty: "medium",
  timeLimit: 600,
  questions: [
    {
      id: "1",
      text: "Newton's First Law is also known as:",
      options: ["Law of Acceleration", "Law of Inertia", "Law of Action-Reaction", "Law of Gravity"],
      correctAnswer: "Law of Inertia",
      explanation:
        "Newton's First Law states that objects at rest stay at rest and objects in motion stay in motion unless acted upon by an external force.",
    },
    {
      id: "2",
      text: "According to Newton's Second Law, F = ma. If mass doubles and acceleration stays the same, force:",
      options: ["Stays the same", "Doubles", "Halves", "Quadruples"],
      correctAnswer: "Doubles",
      explanation: "If F = ma and mass doubles while acceleration stays constant, force must double.",
    },
    {
      id: "3",
      text: "Newton's Third Law states:",
      options: [
        "F = ma",
        "Objects at rest stay at rest",
        "For every action, there is an equal and opposite reaction",
        "Force equals weight",
      ],
      correctAnswer: "For every action, there is an equal and opposite reaction",
      explanation: "Newton's Third Law describes action-reaction pairs of forces.",
    },
    {
      id: "4",
      text: "A 10 kg object accelerates at 5 m/s². What is the net force?",
      options: ["2 N", "15 N", "50 N", "0.5 N"],
      correctAnswer: "50 N",
      explanation: "F = ma = 10 kg × 5 m/s² = 50 N",
    },
    {
      id: "5",
      text: "Which scenario best demonstrates Newton's First Law?",
      options: [
        "A ball rolling down a hill",
        "A passenger sliding forward when a car brakes",
        "Pushing a heavy box",
        "A rocket launching",
      ],
      correctAnswer: "A passenger sliding forward when a car brakes",
      explanation: "The passenger continues moving forward due to inertia when the car suddenly stops.",
    },
  ],
}

export default function PhysicsQuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(physicsQuizData.questions.length).fill(""))
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
    if (currentQuestion < physicsQuizData.questions.length - 1) {
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
    physicsQuizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return Math.round((correctAnswers / physicsQuizData.questions.length) * 100)
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

  const question = physicsQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / physicsQuizData.questions.length) * 100

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
            <CardDescription>You've successfully completed the {physicsQuizData.title} quiz.</CardDescription>
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
                    {answers.filter((a) => a).length}/{physicsQuizData.questions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Correct Answers</span>
                  <span className="font-medium">
                    {Math.round((score / 100) * physicsQuizData.questions.length)}/{physicsQuizData.questions.length}
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
                      <span className="text-sm">Excellent understanding of Newton's Laws!</span>
                    </div>
                  )}
                  {score >= 60 && score < 80 && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Good grasp! Review force calculations and applications.</span>
                    </div>
                  )}
                  {score < 60 && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-sm">Study the three laws and their real-world applications.</span>
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
                setAnswers(Array(physicsQuizData.questions.length).fill(""))
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
              <CardTitle>{physicsQuizData.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span className={timeRemaining < 60 ? "text-red-500" : ""}>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <CardDescription>
            {physicsQuizData.subject} • Question {currentQuestion + 1} of {physicsQuizData.questions.length}
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
            {currentQuestion < physicsQuizData.questions.length - 1 ? (
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
