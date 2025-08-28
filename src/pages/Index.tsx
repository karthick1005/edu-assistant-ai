import React, { useState } from 'react';
import { 
  BookOpen, 
  Upload, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  Eye, 
  Brain,
  Target,
  Zap,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TutorChat from '@/components/TutorChat';
import FileUpload from '@/components/FileUpload';
import ProgressDashboard from '@/components/ProgressDashboard';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [selectedSyllabus, setSelectedSyllabus] = useState('ncert');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isVisualMode, setIsVisualMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Tutor</h1>
                <p className="text-sm text-muted-foreground">Smart Learning Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="quiz-mode"
                  checked={isQuizMode}
                  onCheckedChange={setIsQuizMode}
                />
                <Label htmlFor="quiz-mode" className="text-sm font-medium">
                  Quiz Mode
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="visual-mode"
                  checked={isVisualMode}
                  onCheckedChange={setIsVisualMode}
                />
                <Label htmlFor="visual-mode" className="text-sm font-medium">
                  Visual Learning
                </Label>
              </div>
              
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 gradient-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Syllabus</p>
                    <p className="font-semibold">{selectedSyllabus.toUpperCase()}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 gradient-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Questions Asked</p>
                    <p className="font-semibold">156</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 gradient-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="font-semibold">7 days</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Chat Interface */}
            <TutorChat 
              selectedSyllabus={selectedSyllabus}
              onSyllabusChange={setSelectedSyllabus}
              isQuizMode={isQuizMode}
            />
          </TabsContent>

          <TabsContent value="upload">
            <FileUpload selectedSyllabus={selectedSyllabus} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard />
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Innovative Learning Features</h2>
              <p className="text-muted-foreground">
                Enhance your learning experience with AI-powered tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="Quiz Mode"
                description="Get follow-up questions after each answer to reinforce your learning and test comprehension."
                icon={Brain}
                isActive={isQuizMode}
                onClick={() => setIsQuizMode(!isQuizMode)}
                buttonText="Enable Quiz Mode"
              />

              <FeatureCard
                title="Visual Learning"
                description="Generate diagrams, flowcharts, and visual explanations to better understand complex concepts."
                icon={Eye}
                isActive={isVisualMode}
                onClick={() => setIsVisualMode(!isVisualMode)}
                buttonText="Enable Visual Mode"
              />

              <FeatureCard
                title="Adaptive Learning"
                description="AI tracks your progress and suggests topics you need to revise based on your performance."
                icon={Target}
                isActive={true}
                buttonText="Always Active"
              />

              <FeatureCard
                title="Smart Recommendations"
                description="Get personalized study recommendations based on your learning patterns and weak areas."
                icon={Sparkles}
                isActive={true}
                buttonText="Always Active"
              />
            </div>

            {/* Backend Integration Info */}
            <Card className="p-6 gradient-card shadow-medium border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Backend Integration</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    This frontend is ready to connect to your Python FastAPI backend. The backend should include:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>PDF upload endpoint (/upload-pdf/)</li>
                    <li>Question answering endpoint (/ask-question/)</li>
                    <li>LangChain integration for document processing</li>
                    <li>OpenAI API integration for natural language responses</li>
                    <li>CORS configuration for frontend connection</li>
                  </ul>
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-primary font-medium">
                      💡 Tip: Update the API endpoints in the components to match your backend URL
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;