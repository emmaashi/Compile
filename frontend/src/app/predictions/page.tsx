"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, Smile, BookOpen, Heart, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { JSX } from "react/jsx-runtime"

interface ContentWithCategories {
  title: string
  description: string
  categories: {
    [key: string]: {
      title: string
      recommendations: string[]
    }
  }
}

interface Command {
  name: string
  icon: JSX.Element
  disabled?: boolean
  content?: ContentWithCategories
}

export default function Home() {
  const [query, setQuery] = useState<string>("")
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("")

  const careContent: ContentWithCategories = {
    title: "Optimizing Current Care",
    description: "Comprehensive care recommendations focusing on comfort and quality of life.",
    categories: {
      physical: {
        title: "Physical Comfort",
        recommendations: [
          "Implement regular pain assessment and management protocols",
          "Position patient semi-upright to help with breathing and mucus",
          "Use soft, absorbent materials for bladder management",
          "Offer small sips of water or ice chips for comfort",
          "Ensure proper bed positioning with supportive pillows",
          "Regular gentle mouth care to maintain comfort",
        ],
      },
      daily: {
        title: "Daily Care",
        recommendations: [
          "Monitor breathing patterns and use oxygen if prescribed",
          "Regular gentle repositioning every 2-3 hours",
          "Keep the room at a comfortable temperature",
          "Use a humidifier to help with breathing",
          "Maintain a quiet, peaceful environment",
          "Regular but gentle personal hygiene care",
        ],
      },
    },
  }

  const emotionalContent: ContentWithCategories = {
    title: "Navigating Emotional Challenges",
    description: "Supporting emotional well-being during this sensitive time.",
    categories: {
      support: {
        title: "Emotional Support",
        recommendations: [
          "Maintain a calming presence and gentle touch",
          "Speak softly and reassuringly, even if there's no response",
          "Share memories and express feelings of love",
          "Play favorite music or read familiar stories",
          "Respect moments of silence and rest",
          "Allow close family members quiet time together",
        ],
      },
      family: {
        title: "Family Support",
        recommendations: [
          "Create a schedule for family members to ensure someone is always present",
          "Encourage open expression of emotions among family members",
          "Consider involving a grief counselor or spiritual advisor",
          "Document and share meaningful moments together",
          "Take breaks when needed - self-care is important",
          "Maintain regular communication with healthcare providers",
        ],
      },
    },
  }

  const filteredCommands: Command[] = [
    {
      name: "Optimizing Current Care",
      icon: <Calendar className="h-4 w-4" />,
      content: careContent,
    },
    { name: "What to Expect Next?", icon: <Smile className="h-4 w-4" /> },
    {
      name: "Navigating Emotional Challenges",
      icon: <Heart className="h-4 w-4" />,
      content: emotionalContent,
    },
    { name: "Educational Resources", icon: <BookOpen className="h-4 w-4" /> },
  ]

  const handleCommandClick = (command: Command): void => {
    setSelectedCommand(command)
    if (command.content) {
      setIsDialogOpen(true)
      setActiveTab(Object.keys(command.content.categories)[0])
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-[450px] shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Care Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-11 bg-gray-50/50"
              />
            </div>
          </div>

          <ScrollArea className="h-[300px] rounded-md px-1">
            <AnimatePresence>
              {filteredCommands.filter((command) => command.name.toLowerCase().includes(query.toLowerCase())).length ===
              0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 text-center text-gray-500"
                >
                  No results found.
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="font-medium text-sm text-gray-500 px-2">Suggestions</div>
                  <div className="space-y-2">
                    {filteredCommands
                      .filter((command) => command.name.toLowerCase().includes(query.toLowerCase()))
                      .map((command, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-between group hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => handleCommandClick(command)}
                            disabled={command.disabled}
                          >
                            <span className="flex items-center gap-2">
                              {command.icon}
                              <span className="truncate">{command.name}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden p-0 gap-0">
          <div className="p-6 bg-gradient-to-r from-primary/10 to-blue-500/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-primary">
                {selectedCommand?.content?.title}
              </DialogTitle>
              <DialogDescription className="pt-2 text-gray-600">
                {selectedCommand?.content?.description}
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedCommand?.content && (
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100/80">
                  {Object.keys(selectedCommand.content.categories).map((key) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="capitalize data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                    >
                      {selectedCommand?.content?.categories[key].title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.keys(selectedCommand.content.categories).map((key) => (
                  <TabsContent key={key} value={key} className="mt-6">
                    <Alert className="border-0 bg-gray-50/50">
                      <AlertDescription>
                        <div className="space-y-4">
                          {selectedCommand?.content?.categories[key].recommendations.map((rec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-3 group"
                            >
                              <Badge
                                variant="outline"
                                className="mt-1 flex-shrink-0 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
                              >
                                {index + 1}
                              </Badge>
                              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                                {rec}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
