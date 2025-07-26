import { Badge } from "@/components/ui/badge"

const recentQuizzes = [
  {
    title: "Algebra Basics",
    subject: "Mathematics",
    score: 85,
    date: "2 days ago",
    status: "completed",
  },
  {
    title: "Chemical Bonds",
    subject: "Chemistry",
    score: 72,
    date: "3 days ago",
    status: "completed",
  },
  {
    title: "Newton's Laws",
    subject: "Physics",
    score: 90,
    date: "5 days ago",
    status: "completed",
  },
  {
    title: "Cell Structure",
    subject: "Biology",
    score: 78,
    date: "1 week ago",
    status: "completed",
  },
]

export function RecentQuizzes() {
  return (
    <div className="space-y-4">
      {recentQuizzes.map((quiz, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{quiz.title}</p>
            <p className="text-xs text-muted-foreground">
              {quiz.subject} • {quiz.date}
            </p>
          </div>
          <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
            {quiz.score}%
          </Badge>
        </div>
      ))}
    </div>
  )
}
