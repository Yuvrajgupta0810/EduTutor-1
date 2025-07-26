"use client"

import { motion } from "framer-motion"
import { Brain, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function QuizLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="mx-auto mb-4"
          >
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold"
          >
            Preparing Your Quiz
          </motion.h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-2 bg-primary rounded-full"
            />
            <div className="flex justify-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Clock className="h-4 w-4" />
                <span>Loading questions...</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
