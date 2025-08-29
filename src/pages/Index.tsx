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
  Settings,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TutorChat from '@/components/TutorChat';
import FileUpload from '@/components/FileUpload';
import ProgressDashboard from '@/components/ProgressDashboard';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [selectedSyllabus, setSelectedSyllabus] = useState('ncert');
  const [selectedStandard, setSelectedStandard] = useState('10th');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isVisualMode, setIsVisualMode] = useState(false);

  const getSyllabusDisplayName = (syllabus: string) => {
    switch (syllabus) {
      case 'ncert':
        return 'NCERT';
      case 'samacheer':
        return 'Samacheer Kalvi';
      default:
        return syllabus.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-background geometric-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 gradient-hero-mesh opacity-40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 gradient-neural rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 gradient-primary rounded-full opacity-15 blur-3xl float-animation"></div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b glass-card relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="w-12 h-12 rounded-xl gradient-neural flex items-center justify-center shadow-neural pulse-neural">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-neural bg-clip-text text-transparent">
                  AI Tutor Pro
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Next-Gen Learning Assistant
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 animate-scale-in">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass-card">
                <Switch
                  id="quiz-mode"
                  checked={isQuizMode}
                  onCheckedChange={setIsQuizMode}
                />
                <Label htmlFor="quiz-mode" className="text-sm font-medium">
                  Quiz Mode
                </Label>
              </div>
              
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass-card">
                <Switch
                  id="visual-mode"
                  checked={isVisualMode}
                  onCheckedChange={setIsVisualMode}
                />
                <Label htmlFor="visual-mode" className="text-sm font-medium">
                  Visual Learning
                </Label>
              </div>
              
              <Button variant="ghost" size="icon" className="hover-glow rounded-xl h-10 w-10">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs defaultValue="chat" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 glass-card p-2 h-14 shadow-medium">
            <TabsTrigger value="chat" className="flex items-center gap-2 h-10 font-medium transition-spring data-[state=active]:gradient-primary data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2 h-10 font-medium transition-spring data-[state=active]:gradient-secondary data-[state=active]:text-white">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2 h-10 font-medium transition-spring data-[state=active]:gradient-accent data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2 h-10 font-medium transition-spring data-[state=active]:gradient-neural data-[state=active]:text-white">
              <Sparkles className="w-4 h-4" />
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <Card className="p-6 glass-card hover-lift group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-neural transition-smooth">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-3">Active Syllabus</p>
                    <Select value={selectedSyllabus} onValueChange={setSelectedSyllabus}>
                      <SelectTrigger className="w-full h-10 border-primary/20 focus:border-primary hover:border-primary/40 transition-smooth">
                        <SelectValue placeholder="Select syllabus" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-primary/20">
                        <SelectItem value="ncert" className="hover:bg-primary/10 focus:bg-primary/10">NCERT</SelectItem>
                        <SelectItem value="samacheer" className="hover:bg-primary/10 focus:bg-primary/10">Samacheer Kalvi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card hover-lift group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center shadow-glow group-hover:shadow-neural transition-smooth">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-3">Standard</p>
                    <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                      <SelectTrigger className="w-full h-10 border-secondary/20 focus:border-secondary hover:border-secondary/40 transition-smooth">
                        <SelectValue placeholder="Select standard" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-secondary/20">
                        <SelectItem value="10th" className="hover:bg-secondary/10 focus:bg-secondary/10">10th Standard</SelectItem>
                        <SelectItem value="11th" className="hover:bg-secondary/10 focus:bg-secondary/10">11th Standard</SelectItem>
                        <SelectItem value="12th" className="hover:bg-secondary/10 focus:bg-secondary/10">12th Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card hover-lift group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-glow group-hover:shadow-neural transition-smooth">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Questions Asked</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">156</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card hover-lift group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-neural flex items-center justify-center shadow-neural group-hover:pulse-neural transition-smooth">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-neural to-primary bg-clip-text text-transparent">7 days</p>
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
