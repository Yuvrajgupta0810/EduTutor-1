"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Brain, CheckCircle, Clock, Star, Users } from "lucide-react"
import Link from "next/link"

const courseData = {
  "algebra-fundamentals": {
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    description:
      "Master the basics of algebra including equations, inequalities, and graphing. This comprehensive course will take you from basic algebraic concepts to advanced problem-solving techniques.",
    progress: 75,
    duration: "8 weeks",
    students: 1234,
    rating: 4.8,
    instructor: "Dr. Sarah Wilson",
    image: "/placeholder.svg?height=300&width=800&text=Algebra+course+banner",
    lessons: [
      { id: 1, title: "Introduction to Variables", duration: "15 min", completed: true },
      { id: 2, title: "Basic Equations", duration: "20 min", completed: true },
      { id: 3, title: "Solving Linear Equations", duration: "25 min", completed: true },
      { id: 4, title: "Graphing Linear Functions", duration: "30 min", completed: false },
      { id: 5, title: "Systems of Equations", duration: "35 min", completed: false },
      { id: 6, title: "Quadratic Equations", duration: "40 min", completed: false },
    ],
    quizzes: [
      { id: 1, title: "Variables and Constants", score: 85, completed: true },
      { id: 2, title: "Linear Equations", score: 92, completed: true },
      { id: 3, title: "Graphing Functions", score: null, completed: false },
    ],
  },
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courseData[params.id as keyof typeof courseData]
  const [activeTab, setActiveTab] = useState("overview")

  if (!course) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/dashboard/student/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/dashboard/student/courses">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="aspect-video relative overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <p className="text-muted-foreground mb-4">{course.subject}</p>
                  <CardDescription className="text-base">{course.description}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{course.lessons.length}</div>
                      <div className="text-sm text-muted-foreground">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{course.quizzes.length}</div>
                      <div className="text-sm text-muted-foreground">Quizzes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{course.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{course.students.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-2">What you'll learn:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Solve linear and quadratic equations</li>
                      <li>• Graph linear functions and understand slope</li>
                      <li>• Work with systems of equations</li>
                      <li>• Factor polynomials and expressions</li>
                      <li>• Apply algebraic concepts to real-world problems</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Lessons</CardTitle>
                  <CardDescription>Complete lessons in order to unlock new content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {lesson.completed ? <CheckCircle className="h-4 w-4" /> : <span>{lesson.id}</span>}
                          </div>
                          <div>
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quizzes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with these practice quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              quiz.completed ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Brain className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{quiz.title}</div>
                            {quiz.completed && quiz.score && (
                              <div className="text-sm text-muted-foreground">Score: {quiz.score}%</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {quiz.completed && quiz.score && (
                            <Badge variant={quiz.score >= 80 ? "default" : "secondary"}>{quiz.score}%</Badge>
                          )}
                          <Link href={`/quiz/algebra-fundamentals`}>
                            <Button size="sm" variant={quiz.completed ? "outline" : "default"}>
                              {quiz.completed ? "Retake" : "Start Quiz"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-medium text-primary">SW</span>
                </div>
                <div>
                  <div className="font-medium">{course.instructor}</div>
                  <div className="text-sm text-muted-foreground">Mathematics Professor</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Dr. Wilson has over 15 years of experience teaching mathematics and has helped thousands of students
                master algebra.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/quiz/algebra-fundamentals" className="block">
                <Button className="w-full gap-2">
                  <Brain className="h-4 w-4" />
                  Take Practice Quiz
                </Button>
              </Link>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                Download Materials
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                Join Study Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
