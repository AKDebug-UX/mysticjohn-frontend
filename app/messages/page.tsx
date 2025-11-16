'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Navigation } from '@/components/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Coins, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

// Sample message history
const sampleMessages = [
  {
    id: 1,
    type: 'user',
    content: 'What does the universe want me to know about my career path?',
    timestamp: '2 days ago',
  },
  {
    id: 2,
    type: 'psychic',
    content: 'Ah, lovely soul, the spirits are tellin\' me ye\'re on the cusp of a big change. Trust yer instincts—there\'s an opportunity comin\' yer way that\'ll align with yer true purpose. Dinnae be afraid tae take the leap when it arrives.',
    timestamp: '2 days ago',
  },
  {
    id: 3,
    type: 'user',
    content: 'Will my relationship improve this month?',
    timestamp: '5 days ago',
  },
  {
    id: 4,
    type: 'psychic',
    content: 'The cards show communication is key, pal. Open yer heart and speak yer truth—the universe rewards honesty. I see healing energy surroundin\' ye both by the full moon.',
    timestamp: '5 days ago',
  },
]

export default function MessagesPage() {
  const [message, setMessage] = useState('')
  const [credits] = useState(3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 blur-3xl rounded-full animate-glow" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Quick Reply Messages
              </h1>
              <p className="text-muted-foreground text-lg">
                Ye've got credits tae spend, dinnae waste them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Input & History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Credit Display Bar */}
              <Card className="border-primary/50 relative overflow-hidden shadow-lg shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
                <MysticalSparkles />
                <CardContent className="relative z-10 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Coins className="h-6 w-6 text-primary animate-glow" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Your Balance</p>
                        <p className="text-2xl font-bold text-foreground">{credits} Credits</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                      Buy More
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Message Input Box */}
              <Card className="border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-foreground">Ask Your Question</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    The universe is listening...
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Textarea
                    placeholder="Ask your question here... the universe is listening."
                    className="min-h-[150px] resize-none border-border/50 focus:border-primary/50 bg-background/50 text-foreground placeholder:text-muted-foreground"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      1 credit will be used for this message
                    </p>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      disabled={!message.trim() || credits === 0}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Spend 1 Credit & Send
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Message History Section */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Message History</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your conversations with the spirits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.type === 'user'
                            ? 'bg-primary/10 border border-primary/20'
                            : 'bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 relative overflow-hidden'
                        }`}
                      >
                        {msg.type === 'psychic' && (
                          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/20 blur-xl" />
                        )}
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            {msg.type === 'psychic' && (
                              <Sparkles className="h-4 w-4 text-accent" />
                            )}
                            <span className="text-xs font-semibold text-foreground">
                              {msg.type === 'user' ? 'You' : 'John'}
                            </span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed mb-2">
                            {msg.content}
                          </p>
                          <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* How It Works */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Write yer question in the box above
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-accent">2</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Spend 1 credit to send yer message
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-secondary-foreground">3</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Get a personal reply from John within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="border-border/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-foreground text-lg">Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Be specific with yer questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>One question per message works best</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Replies come within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Keep an open mind and heart</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Buy More Credits CTA */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
                <MysticalSparkles />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-foreground text-lg">Need More Credits?</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Get more answers from the universe
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">5 Credits</span>
                      <span className="font-bold text-foreground">£25</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">10 Credits</span>
                      <span className="font-bold text-foreground">£45</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">20 Credits</span>
                      <span className="font-bold text-foreground">£80</span>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                      Buy Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
