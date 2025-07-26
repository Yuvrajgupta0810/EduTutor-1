import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Plus, Users } from "lucide-react"
import { StudentList } from "@/components/student-list"
import { ClassPerformance } from "@/components/class-performance"
import { TopicPerformance } from "@/components/topic-performance"
import { MobileDashboardNav } from "@/components/mobile-dashboard-nav"

export const metadata: Metadata = {
  title: "Educator Dashboard | EduTutor AI",
  description: "Educator dashboard for EduTutor AI platform",
}

export default function EducatorDashboard() {
  return (
    <div className="flex flex-col">
      <div className="md:hidden">
        <MobileDashboardNav />
      </div>
      <div className="container py-6">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Educator Dashboard</h1>
          <p className="text-muted-foreground">Monitor your students' progress and performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">42</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">5</div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">128</div>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 pt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg?height=32&width=32&text=Analytics+chart+icon"
                    alt="Class Performance"
                    className="h-8 w-8"
                  />
                  <div>
                    <CardTitle>Class Performance</CardTitle>
                    <CardDescription>Average performance across all subjects</CardDescription>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ClassPerformance />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Topic Performance</CardTitle>
                    <CardDescription>Average scores by topic</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <TopicPerformance />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest student activities</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">JS</span>
                      </div>
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">Completed Algebra Quiz • 85%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">MP</span>
                      </div>
                      <div>
                        <div className="font-medium">Maria Perez</div>
                        <div className="text-sm text-muted-foreground">Started Chemistry Course</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">AK</span>
                      </div>
                      <div>
                        <div className="font-medium">Alex Kim</div>
                        <div className="text-sm text-muted-foreground">Completed Physics Quiz • 92%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">SJ</span>
                      </div>
                      <div>
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">Completed Biology Quiz • 78%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="students" className="pt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Students</h2>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <StudentList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Average scores by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Mathematics</div>
                        <div className="text-sm font-medium">78%</div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Physics</div>
                        <div className="text-sm font-medium">65%</div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Chemistry</div>
                        <div className="text-sm font-medium">72%</div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Biology</div>
                        <div className="text-sm font-medium">81%</div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "81%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Learning Interventions</CardTitle>
                  <CardDescription>Recommended interventions based on performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Physics - Newton's Laws</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        8 students scoring below 60%. Consider additional practice exercises.
                      </p>
                    </div>
                    <div className="p-4 rounded-md bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                      <h4 className="font-medium text-red-800 dark:text-red-300 mb-1">Chemistry - Chemical Bonding</h4>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        12 students scoring below 50%. Urgent review needed.
                      </p>
                    </div>
                    <div className="p-4 rounded-md bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Mathematics - Algebra</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Most students performing well. Consider advanced topics.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
