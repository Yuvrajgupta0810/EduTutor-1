import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const students = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@school.edu",
    averageScore: 85,
    quizzesCompleted: 12,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Maria Perez",
    email: "maria.perez@school.edu",
    averageScore: 92,
    quizzesCompleted: 15,
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Alex Kim",
    email: "alex.kim@school.edu",
    averageScore: 78,
    quizzesCompleted: 8,
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    averageScore: 88,
    quizzesCompleted: 11,
    lastActive: "5 hours ago",
  },
]

export function StudentList() {
  return (
    <div className="divide-y">
      {students.map((student) => (
        <div key={student.id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Avg: {student.averageScore}%</p>
              <p className="text-xs text-muted-foreground">{student.quizzesCompleted} quizzes</p>
            </div>
            <Badge variant={student.averageScore >= 80 ? "default" : "secondary"}>
              {student.averageScore >= 80 ? "Good" : "Needs Help"}
            </Badge>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
