"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTransition } from "@/components/page-transition"
import { AnimatedCard } from "@/components/animated-card"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Brain,
  Clock,
  Star,
  PlayCircle,
  Search,
  TrendingUp,
  Award,
  Target,
  Zap,
  BookOpen,
  Calculator,
  Microscope,
  Scroll,
  Atom,
  Globe,
  Palette,
  Music,
  Code,
  Languages,
} from "lucide-react"

const allQuizzes = [
  // Mathematics
  {
    id: "algebra-fundamentals",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    difficulty: "Medium",
    duration: "10 min",
    questions: 5,
    rating: 4.8,
    attempts: 1234,
    description: "Master basic algebraic equations and problem-solving techniques.",
    icon: Calculator,
    color: "blue",
    link: "/quiz/algebra-fundamentals",
    tags: ["equations", "variables", "graphing"],
  },
  {
    id: "advanced-calculus",
    title: "Advanced Calculus",
    subject: "Mathematics",
    difficulty: "Hard",
    duration: "15 min",
    questions: 5,
    rating: 4.6,
    attempts: 567,
    description: "Challenge yourself with derivatives, integrals, and limits.",
    icon: Calculator,
    color: "purple",
    link: "/quiz/advanced-calculus",
    tags: ["derivatives", "integrals", "limits"],
  },
  {
    id: "geometry-basics",
    title: "Geometry Basics",
    subject: "Mathematics",
    difficulty: "Easy",
    duration: "8 min",
    questions: 6,
    rating: 4.9,
    attempts: 2156,
    description: "Learn about shapes, angles, and geometric properties.",
    icon: Target,
    color: "green",
    link: "/quiz/geometry-basics",
    tags: ["shapes", "angles", "area"],
  },
  {
    id: "trigonometry",
    title: "Trigonometry",
    subject: "Mathematics",
    difficulty: "Medium",
    duration: "12 min",
    questions: 7,
    rating: 4.5,
    attempts: 890,
    description: "Explore sine, cosine, tangent and their applications.",
    icon: Calculator,
    color: "indigo",
    link: "/quiz/trigonometry",
    tags: ["sine", "cosine", "triangles"],
  },

  // Science
  {
    id: "biology-cells",
    title: "Cell Biology",
    subject: "Biology",
    difficulty: "Medium",
    duration: "10 min",
    questions: 5,
    rating: 4.7,
    attempts: 1567,
    description: "Discover the structure and function of cells.",
    icon: Microscope,
    color: "green",
    link: "/quiz/biology-cells",
    tags: ["cells", "organelles", "mitochondria"],
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions",
    subject: "Chemistry",
    difficulty: "Medium",
    duration: "10 min",
    questions: 5,
    rating: 4.6,
    attempts: 1234,
    description: "Learn about different types of chemical reactions.",
    icon: Atom,
    color: "red",
    link: "/quiz/chemical-reactions",
    tags: ["reactions", "equations", "balancing"],
  },
  {
    id: "newton-laws",
    title: "Newton's Laws",
    subject: "Physics",
    difficulty: "Medium",
    duration: "10 min",
    questions: 5,
    rating: 4.7,
    attempts: 987,
    description: "Understand the fundamental laws of motion.",
    icon: Zap,
    color: "yellow",
    link: "/quiz/newton-laws",
    tags: ["motion", "force", "acceleration"],
  },
  {
    id: "periodic-table",
    title: "Periodic Table",
    subject: "Chemistry",
    difficulty: "Easy",
    duration: "8 min",
    questions: 6,
    rating: 4.8,
    attempts: 1890,
    description: "Master the elements and their properties.",
    icon: Atom,
    color: "orange",
    link: "/quiz/periodic-table",
    tags: ["elements", "properties", "groups"],
  },
  {
    id: "human-anatomy",
    title: "Human Anatomy",
    subject: "Biology",
    difficulty: "Hard",
    duration: "15 min",
    questions: 8,
    rating: 4.4,
    attempts: 678,
    description: "Explore the human body systems and organs.",
    icon: Microscope,
    color: "pink",
    link: "/quiz/human-anatomy",
    tags: ["organs", "systems", "body"],
  },
  {
    id: "electricity-magnetism",
    title: "Electricity & Magnetism",
    subject: "Physics",
    difficulty: "Hard",
    duration: "12 min",
    questions: 6,
    rating: 4.3,
    attempts: 543,
    description: "Understand electrical circuits and magnetic fields.",
    icon: Zap,
    color: "blue",
    link: "/quiz/electricity-magnetism",
    tags: ["circuits", "current", "magnetism"],
  },

  // History & Social Studies
  {
    id: "world-history",
    title: "Ancient Civilizations",
    subject: "History",
    difficulty: "Medium",
    duration: "10 min",
    questions: 5,
    rating: 4.5,
    attempts: 1123,
    description: "Journey through ancient civilizations and their achievements.",
    icon: Scroll,
    color: "amber",
    link: "/quiz/world-history",
    tags: ["ancient", "civilizations", "culture"],
  },
  {
    id: "world-wars",
    title: "World Wars",
    subject: "History",
    difficulty: "Hard",
    duration: "15 min",
    questions: 8,
    rating: 4.2,
    attempts: 789,
    description: "Learn about the major conflicts of the 20th century.",
    icon: Scroll,
    color: "gray",
    link: "/quiz/world-wars",
    tags: ["war", "conflict", "20th century"],
  },
  {
    id: "geography-world",
    title: "World Geography",
    subject: "Geography",
    difficulty: "Easy",
    duration: "8 min",
    questions: 6,
    rating: 4.6,
    attempts: 1456,
    description: "Test your knowledge of countries, capitals, and landmarks.",
    icon: Globe,
    color: "teal",
    link: "/quiz/geography-world",
    tags: ["countries", "capitals", "continents"],
  },

  // Languages & Arts
  {
    id: "english-grammar",
    title: "English Grammar",
    subject: "English",
    difficulty: "Medium",
    duration: "10 min",
    questions: 7,
    rating: 4.4,
    attempts: 1678,
    description: "Master grammar rules and sentence structure.",
    icon: BookOpen,
    color: "violet",
    link: "/quiz/english-grammar",
    tags: ["grammar", "syntax", "writing"],
  },
  {
    id: "art-history",
    title: "Art History",
    subject: "Arts",
    difficulty: "Medium",
    duration: "12 min",
    questions: 6,
    rating: 4.3,
    attempts: 567,
    description: "Explore famous artworks and artistic movements.",
    icon: Palette,
    color: "rose",
    link: "/quiz/art-history",
    tags: ["paintings", "artists", "movements"],
  },
  {
    id: "music-theory",
    title: "Music Theory",
    subject: "Music",
    difficulty: "Hard",
    duration: "15 min",
    questions: 8,
    rating: 4.1,
    attempts: 345,
    description: "Learn about scales, chords, and musical composition.",
    icon: Music,
    color: "cyan",
    link: "/quiz/music-theory",
    tags: ["scales", "chords", "composition"],
  },

  // Technology
  {
    id: "programming-basics",
    title: "Programming Basics",
    subject: "Computer Science",
    difficulty: "Easy",
    duration: "10 min",
    questions: 6,
    rating: 4.7,
    attempts: 2134,
    description: "Introduction to programming concepts and logic.",
    icon: Code,
    color: "emerald",
    link: "/quiz/programming-basics",
    tags: ["coding", "logic", "algorithms"],
  },
  {
    id: "web-development",
    title: "Web Development",
    subject: "Computer Science",
    difficulty: "Medium",
    duration: "12 min",
    questions: 7,
    rating: 4.5,
    attempts: 1234,
    description: "Learn HTML, CSS, and JavaScript fundamentals.",
    icon: Code,
    color: "blue",
    link: "/quiz/web-development",
    tags: ["html", "css", "javascript"],
  },

  // Languages
  {
    id: "spanish-basics",
    title: "Spanish Basics",
    subject: "Spanish",
    difficulty: "Easy",
    duration: "8 min",
    questions: 6,
    rating: 4.6,
    attempts: 987,
    description: "Learn basic Spanish vocabulary and grammar.",
    icon: Languages,
    color: "red",
    link: "/quiz/spanish-basics",
    tags: ["vocabulary", "grammar", "basics"],
  },
  {
    id: "french-intermediate",
    title: "French Intermediate",
    subject: "French",
    difficulty: "Medium",
    duration: "12 min",
    questions: 8,
    rating: 4.3,
    attempts: 654,
    description: "Advance your French language skills.",
    icon: Languages,
    color: "blue",
    link: "/quiz/french-intermediate",
    tags: ["conversation", "grammar", "vocabulary"],
  },
]

const subjects = [
  "All",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Geography",
  "English",
  "Arts",
  "Music",
  "Computer Science",
  "Spanish",
  "French",
]
const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  const filteredQuizzes = allQuizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject = selectedSubject === "All" || quiz.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty

    return matchesSearch && matchesSubject && matchesDifficulty
  })

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.attempts - a.attempts
      case "rating":
        return b.rating - a.rating
      case "difficulty":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
        return (
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        )
      case "duration":
        return Number.parseInt(a.duration) - Number.parseInt(b.duration)
      default:
        return 0
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "green"
      case "Medium":
        return "amber"
      case "Hard":
        return "red"
      default:
        return "gray"
    }
  }

  return (
    <PageTransition>
      <div className="container py-6">
        <motion.div
          className="flex flex-col gap-1 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Practice Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge with our comprehensive quiz collection.</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{allQuizzes.length}</p>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{subjects.length - 1}</p>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">4.5</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quiz Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedQuizzes.map((quiz, index) => {
            const IconComponent = quiz.icon
            return (
              <StaggerItem key={quiz.id}>
                <AnimatedCard delay={index * 0.1}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-2 rounded-lg bg-${quiz.color}-100 dark:bg-${quiz.color}-900/30`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className={`h-5 w-5 text-${quiz.color}-600`} />
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{quiz.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{quiz.description}</CardDescription>

                    <div className="flex flex-wrap gap-2">
                      {quiz.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Brain className="h-4 w-4" />
                          <span>{quiz.questions} questions</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-${getDifficultyColor(quiz.difficulty)}-600 border-${getDifficultyColor(quiz.difficulty)}-200`}
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {quiz.attempts.toLocaleString()} students attempted
                    </div>

                    <Link href={quiz.link} className="block">
                      <Button className="w-full gap-2 transition-all duration-200 hover:scale-105">
                        <PlayCircle className="h-4 w-4" />
                        Start Quiz
                      </Button>
                    </Link>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {sortedQuizzes.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
