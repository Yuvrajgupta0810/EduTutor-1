"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, CheckCircle, Clock } from "lucide-react"
import { mockQuizData } from "@/lib/mock-data"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(mockQuizData.questions.length).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setQuizCompleted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const question = mockQuizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuizData.questions.length) * 100

  // Format time remaining as mm:ss
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
              <img
                src="/placeholder.svg?height=80&width=80&text=Trophy+with+graduation+cap+celebration"
                alt="Quiz completed celebration"
                className="mx-auto h-16 w-16 mb-2"
              />
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>You've successfully completed the {mockQuizData.title} quiz.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">85%</div>
                <p className="text-muted-foreground mt-1">Your Score</p>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Questions Answered</span>
                  <span className="font-medium">
                    {answers.filter((a) => a).length}/{mockQuizData.questions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Correct Answers</span>
                  <span className="font-medium">17/20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Taken</span>
                  <span className="font-medium">8:23</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4 mt-6">
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>Chemical Bonding Concepts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>Balancing Chemical Equations</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={() => router.push("/dashboard/student")}>
              Return to Dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setQuizCompleted(false)
                setCurrentQuestion(0)
                setAnswers(Array(mockQuizData.questions.length).fill(""))
              }}
            >
              Review Answers
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
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>{mockQuizData.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <CardDescription>
            {mockQuizData.subject} • Question {currentQuestion + 1} of {mockQuizData.questions.length}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{question.text}</h3>
              {question.image && (
                <div className="my-4 rounded-md overflow-hidden border">
                  <img
                    src={question.image || "/placeholder.svg"}
                    alt="Question illustration"
                    className="w-full object-cover"
                  />
                </div>
              )}
            </div>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
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
          <Button onClick={handleNext} disabled={currentQuestion === mockQuizData.questions.length - 1}>
            Next
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
