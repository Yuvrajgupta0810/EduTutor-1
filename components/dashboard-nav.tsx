"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Brain, BarChart3, Settings, Users, FileText, Home, GraduationCap } from "lucide-react"

const studentNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard/student",
    icon: Home,
  },
  {
    title: "My Courses",
    href: "/dashboard/student/courses",
    icon: BookOpen,
  },
  {
    title: "Quizzes",
    href: "/dashboard/student/quizzes",
    icon: Brain,
  },
  {
    title: "Performance",
    href: "/dashboard/student/performance",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/student/settings",
    icon: Settings,
  },
]

const educatorNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard/educator",
    icon: Home,
  },
  {
    title: "Students",
    href: "/dashboard/educator/students",
    icon: Users,
  },
  {
    title: "Courses",
    href: "/dashboard/educator/courses",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/dashboard/educator/analytics",
    icon: BarChart3,
  },
  {
    title: "Materials",
    href: "/dashboard/educator/materials",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/educator/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const isEducator = pathname.includes("/educator")
  const navItems = isEducator ? educatorNavItems : studentNavItems

  return (
    <nav className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-2 px-2 py-1 mb-4">
        <GraduationCap className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">{isEducator ? "Educator Portal" : "Student Portal"}</span>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
