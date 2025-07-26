"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Target, Award, Brain, Clock } from "lucide-react"

const performanceData = [
  { week: "Week 1", score: 65, time: 45 },
  { week: "Week 2", score: 72, time: 52 },
  { week: "Week 3", score: 68, time: 38 },
  { week: "Week 4", score: 78, time: 41 },
  { week: "Week 5", score: 82, time: 35 },
  { week: "Week 6", score: 85, time: 33 },
]

const subjectData = [
  { subject: "Mathematics", score: 85, improvement: 12, color: "#3b82f6" },
  { subject: "Physics", score: 72, improvement: -3, color: "#ef4444" },
  { subject: "Chemistry", score: 78, improvement: 8, color: "#10b981" },
  { subject: "Biology", score: 88, improvement: 15, color: "#f59e0b" },
]

const difficultyData = [
  { name: "Easy", value: 45, color: "#10b981" },
  { name: "Medium", value: 35, color: "#f59e0b" },
  { name: "Hard", value: 20, color: "#ef4444" },
]

const recentQuizzes = [
  {
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    score: 85,
    date: "2 days ago",
    time: "8:23",
    status: "completed",
  },
  {
    title: "Chemical Reactions",
    subject: "Chemistry",
    score: 78,
    date: "3 days ago",
    time: "12:15",
    status: "completed",
  },
  { title: "Newton's Laws", subject: "Physics", score: 92, date: "5 days ago", time: "6:45", status: "completed" },
  { title: "Cell Structure", subject: "Biology", score: 88, date: "1 week ago", time: "9:30", status: "completed" },
  {
    title: "Quadratic Equations",
    subject: "Mathematics",
    score: 76,
    date: "1 week ago",
    time: "11:20",
    status: "completed",
  },
]

export default function PerformancePage() {
  const averageScore = Math.round(performanceData.reduce((acc, curr) => acc + curr.score, 0) / performanceData.length)
  const averageTime = Math.round(performanceData.reduce((acc, curr) => acc + curr.time, 0) / performanceData.length)
  const totalQuizzes = recentQuizzes.length
  const improvementTrend = performanceData[performanceData.length - 1].score - performanceData[0].score

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
        <p className="text-muted-foreground">Track your learning progress and identify areas for improvement.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{averageScore}%</div>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1 mt-1">
              {improvementTrend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs ${improvementTrend > 0 ? "text-green-500" : "text-red-500"}`}>
                {improvementTrend > 0 ? "+" : ""}
                {improvementTrend}% from start
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalQuizzes}</div>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time per Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{averageTime}m</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Average completion time</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Days in a row</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty Analysis</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Progression</CardTitle>
                <CardDescription>Your quiz scores over the last 6 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Efficiency</CardTitle>
                <CardDescription>Average time spent per quiz (minutes)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="time" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectData.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{subject.subject}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{subject.score}%</span>
                          <div className="flex items-center gap-1">
                            {subject.improvement > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs ${subject.improvement > 0 ? "text-green-500" : "text-red-500"}`}>
                              {subject.improvement > 0 ? "+" : ""}
                              {subject.improvement}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <Progress value={subject.score} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Comparison</CardTitle>
                <CardDescription>Visual comparison of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="difficulty" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Difficulty Distribution</CardTitle>
                <CardDescription>Breakdown of quiz difficulty levels attempted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Based on your performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Strengths</h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                      <li>• Consistent improvement in Mathematics</li>
                      <li>• Strong performance in Biology</li>
                      <li>• Good time management skills</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-md bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Areas for Improvement</h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                      <li>• Focus more on Physics concepts</li>
                      <li>• Try more challenging problems</li>
                      <li>• Review Chemistry fundamentals</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz History</CardTitle>
              <CardDescription>Your recent quiz attempts and scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {quiz.subject} • {quiz.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Time: {quiz.time}</div>
                      </div>
                      <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                        {quiz.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
