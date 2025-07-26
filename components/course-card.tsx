"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle } from "lucide-react"
import { motion } from "framer-motion"

interface CourseCardProps {
  title: string
  subject: string
  progress: number
  image: string
}

export function CourseCard({ title, subject, progress, image }: CourseCardProps) {
  const getSubjectImage = (subject: string, title: string) => {
    const subjectImages = {
      Mathematics: `/placeholder.svg?height=200&width=300&text=Mathematics+equations+and+graphs+on+blackboard`,
      Chemistry: `/placeholder.svg?height=200&width=300&text=Chemistry+lab+with+beakers+and+molecular+structures`,
      Physics: `/placeholder.svg?height=200&width=300&text=Physics+concepts+with+formulas+and+diagrams`,
      Biology: `/placeholder.svg?height=200&width=300&text=Biology+cell+structure+and+DNA+illustration`,
      History: `/placeholder.svg?height=200&width=300&text=Historical+timeline+with+ancient+artifacts`,
    }
    return (
      subjectImages[subject as keyof typeof subjectImages] ||
      `/placeholder.svg?height=200&width=300&text=${subject}+course+materials`
    )
  }

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
        <motion.div
          className="aspect-video relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image || getSubjectImage(subject, title)}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 rounded-full p-3"
            >
              <PlayCircle className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>

        <CardHeader className="pb-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subject}</p>
          </motion.div>
        </CardHeader>

        <CardContent className="pb-2">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.3, duration: 0.8 }}>
              <Progress value={progress} />
            </motion.div>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-2">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button
              className="w-full gap-2 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle className="h-4 w-4" />
              Continue Learning
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
