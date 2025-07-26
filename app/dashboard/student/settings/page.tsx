"use client"

import { useState, useEffect } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/page-transition"
import { AnimatedCard } from "@/components/animated-card"
import { StaggerContainer, StaggerItem } from "@/components/stagger-container"
import { motion } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Volume2,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
} from "lucide-react"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    quiz: true,
    progress: false,
    reminders: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: false,
    achievementsVisible: true,
  })
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    difficulty: "medium",
    soundEnabled: true,
    autoSave: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message (you can add toast here)
  }

  const handleReset = () => {
    setNotifications({
      email: true,
      push: true,
      quiz: true,
      progress: false,
      reminders: true,
    })
    setPrivacy({
      profileVisible: true,
      progressVisible: false,
      achievementsVisible: true,
    })
    setPreferences({
      language: "en",
      timezone: "UTC",
      difficulty: "medium",
      soundEnabled: true,
      autoSave: true,
    })
  }

  if (!user) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Settings...</h1>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Palette className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="account" className="gap-2">
                <Lock className="h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="profile" className="space-y-6">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>Update your personal information and profile details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-lg">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Change Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Tell us about yourself..." />
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>

              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                    <CardDescription>Your academic details and learning preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select defaultValue="12">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">School/Institution</Label>
                      <Input id="school" placeholder="Enter your school name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Favorite Subjects</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Mathematics", "Physics", "Chemistry", "Biology", "History"].map((subject) => (
                          <Badge
                            key={subject}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">Learning Goals</Label>
                      <Input id="goals" placeholder="What do you want to achieve?" />
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about your learning progress.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Quiz Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about pending quizzes</p>
                    </div>
                    <Switch
                      checked={notifications.quiz}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, quiz: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Progress Updates</Label>
                      <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
                    </div>
                    <Switch
                      checked={notifications.progress}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, progress: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">Daily study session reminders</p>
                    </div>
                    <Switch
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control who can see your information and progress.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other students</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Progress Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow others to see your learning progress</p>
                    </div>
                    <Switch
                      checked={privacy.progressVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, progressVisible: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Achievement Display</Label>
                      <p className="text-sm text-muted-foreground">Show your achievements and badges publicly</p>
                    </div>
                    <Switch
                      checked={privacy.achievementsVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, achievementsVisible: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription>Customize how the app looks and feels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={!isDarkMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsDarkMode(false)}
                          className="gap-2"
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={isDarkMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsDarkMode(true)}
                          className="gap-2"
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="IST">IST (India)</SelectItem>
                          <SelectItem value="EST">EST (US East)</SelectItem>
                          <SelectItem value="PST">PST (US West)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>

              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      Learning Preferences
                    </CardTitle>
                    <CardDescription>Customize your learning experience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Default Difficulty</Label>
                      <Select
                        value={preferences.difficulty}
                        onValueChange={(value) => setPreferences({ ...preferences, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                          <SelectItem value="adaptive">Adaptive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">Enable audio feedback</p>
                      </div>
                      <Switch
                        checked={preferences.soundEnabled}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, soundEnabled: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Auto-Save Progress</Label>
                        <p className="text-sm text-muted-foreground">Automatically save your progress</p>
                      </div>
                      <Switch
                        checked={preferences.autoSave}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
                      />
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Security
                    </CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="w-full">Update Password</Button>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>

              <StaggerItem>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Connected Devices
                    </CardTitle>
                    <CardDescription>Manage devices connected to your account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">iPhone 14</p>
                            <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">MacBook Pro</p>
                            <p className="text-sm text-muted-foreground">Last active: 1 day ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>
          </TabsContent>
        </Tabs>

        <motion.div
          className="flex justify-between items-center pt-6 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
