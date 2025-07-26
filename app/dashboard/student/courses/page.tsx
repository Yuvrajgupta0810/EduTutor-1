"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, PlayCircle, Users, Star } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: "algebra-fundamentals",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    description: "Master the basics of algebra including equations, inequalities, and graphing.",
    progress: 75,
    duration: "8 weeks",
    students: 1234,
    rating: 4.8,
    instructor: "Dr. Sarah Wilson",
    image: "/placeholder.svg?height=200&width=300&text=Algebra+equations+and+graphs",
    lessons: 24,
    quizzes: 8,
    status: "enrolled",
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions",
    subject: "Chemistry",
    description: "Explore different types of chemical reactions and learn to balance equations.",
    progress: 45,
    duration: "6 weeks",
    students: 892,
    rating: 4.6,
    instructor: "Prof. Michael Chen",
    image: "/placeholder.svg?height=200&width=300&text=Chemistry+lab+reactions",
    lessons: 18,
    quizzes: 6,
    status: "enrolled",
  },
  {
    id: "newton-laws",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    description: "Understand the fundamental laws that govern motion and forces.",
    progress: 60,
    duration: "5 weeks",
    students: 756,
    rating: 4.7,
    instructor: "Dr. Alex Rodriguez",
    image: "/placeholder.svg?height=200&width=300&text=Physics+motion+diagrams",
    lessons: 15,
    quizzes: 5,
    status: "enrolled",
  },
  {
    id: "cell-biology",
    title: "Cell Biology Basics",
    subject: "Biology",
    description: "Discover the structure and function of cells, the building blocks of life.",
    progress: 80,
    duration: "7 weeks",
    students: 1456,
    rating: 4.9,
    instructor: "Dr. Emily Johnson",
    image: "/placeholder.svg?height=200&width=300&text=Cell+structure+microscope",
    lessons: 21,
    quizzes: 7,
    status: "enrolled",
  },
  {
    id: "world-history",
    title: "World History Overview",
    subject: "History",
    description: "Journey through major historical events and civilizations.",
    progress: 30,
    duration: "10 weeks",
    students: 2134,
    rating: 4.5,
    instructor: "Prof. David Thompson",
    image: "/placeholder.svg?height=200&width=300&text=Ancient+civilizations+timeline",
    lessons: 30,
    quizzes: 10,
    status: "enrolled",
  },
  {
    id: "calculus-intro",
    title: "Introduction to Calculus",
    subject: "Mathematics",
    description: "Learn the fundamentals of differential and integral calculus.",
    progress: 0,
    duration: "12 weeks",
    students: 987,
    rating: 4.8,
    instructor: "Dr. Lisa Park",
    image: "/placeholder.svg?height=200&width=300&text=Calculus+derivatives+integrals",
    lessons: 36,
    quizzes: 12,
    status: "available",
  },
]

export default function CoursesPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Continue your learning journey with personalized courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2">
                <Badge variant={course.status === "enrolled" ? "default" : "secondary"}>
                  {course.status === "enrolled" ? "Enrolled" : "Available"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{course.subject}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardDescription className="text-sm">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    {course.lessons} lessons • {course.quizzes} quizzes
                  </span>
                </div>
              </div>

              {course.status === "enrolled" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              )}

              <div className="flex gap-2">
                {course.status === "enrolled" ? (
                  <Link href={`/course/${course.id}`} className="flex-1">
                    <Button className="w-full gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <Button className="flex-1 gap-2">
                    <BookOpen className="h-4 w-4" />
                    Enroll Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
