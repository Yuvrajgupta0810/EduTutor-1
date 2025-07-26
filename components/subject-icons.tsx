export const SubjectIcons = {
  Mathematics: "/placeholder.svg?height=24&width=24&text=∑+math+symbol",
  Chemistry: "/placeholder.svg?height=24&width=24&text=⚗️+chemistry+flask",
  Physics: "/placeholder.svg?height=24&width=24&text=⚛️+atom+symbol",
  Biology: "/placeholder.svg?height=24&width=24&text=🧬+DNA+helix",
  History: "/placeholder.svg?height=24&width=24&text=🏛️+ancient+column",
  English: "/placeholder.svg?height=24&width=24&text=📚+book+icon",
  Geography: "/placeholder.svg?height=24&width=24&text=🌍+globe+icon",
  Computer_Science: "/placeholder.svg?height=24&width=24&text=💻+computer+code",
}

export function getSubjectIcon(subject: string) {
  const normalizedSubject = subject.replace(/\s+/g, "_") as keyof typeof SubjectIcons
  return SubjectIcons[normalizedSubject] || "/placeholder.svg?height=24&width=24&text=📖+book"
}
