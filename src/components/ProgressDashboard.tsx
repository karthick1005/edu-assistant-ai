import React from 'react';
import { TrendingUp, Award, Clock, BookOpen, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressData {
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  timeSpent: number; // in minutes
  topicsCompleted: number;
  totalTopics: number;
  recentActivity: Array<{
    topic: string;
    score: number;
    date: string;
  }>;
  weakAreas: string[];
}

const ProgressDashboard: React.FC = () => {
  // Mock data - in real implementation, this would come from your backend
  const progressData: ProgressData = {
    totalQuestions: 156,
    correctAnswers: 132,
    currentStreak: 7,
    timeSpent: 245,
    topicsCompleted: 12,
    totalTopics: 20,
    recentActivity: [
      { topic: 'Algebra', score: 85, date: '2024-01-15' },
      { topic: 'Geometry', score: 92, date: '2024-01-14' },
      { topic: 'Physics - Motion', score: 78, date: '2024-01-13' },
      { topic: 'Chemistry - Acids', score: 88, date: '2024-01-12' },
    ],
    weakAreas: ['Trigonometry', 'Organic Chemistry', 'Wave Motion']
  };

  const accuracy = Math.round((progressData.correctAnswers / progressData.totalQuestions) * 100);
  const topicProgress = Math.round((progressData.topicsCompleted / progressData.totalTopics) * 100);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 gradient-card shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 gradient-card shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-secondary">{progressData.currentStreak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 gradient-card shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Spent</p>
              <p className="text-2xl font-bold text-accent-foreground">{Math.floor(progressData.timeSpent / 60)}h {progressData.timeSpent % 60}m</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 gradient-card shadow-soft">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Topics</p>
              <p className="text-2xl font-bold text-success">{progressData.topicsCompleted}/{progressData.totalTopics}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <Card className="p-6 gradient-card shadow-medium">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Learning Progress</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Accuracy</span>
                <span className="font-medium">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Topic Completion</span>
                <span className="font-medium">{topicProgress}%</span>
              </div>
              <Progress value={topicProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weekly Goal</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">Great Progress!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You've maintained a {progressData.currentStreak}-day streak. Keep it up!
            </p>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 gradient-card shadow-medium">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            {progressData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.topic}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <Badge 
                  variant={activity.score >= 85 ? "default" : activity.score >= 70 ? "secondary" : "destructive"}
                  className={
                    activity.score >= 85 
                      ? "gradient-primary text-white" 
                      : activity.score >= 70 
                      ? "gradient-secondary text-white"
                      : ""
                  }
                >
                  {activity.score}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Areas for Improvement */}
      <Card className="p-6 gradient-card shadow-medium">
        <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {progressData.weakAreas.map((area, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="border-warning text-warning hover:bg-warning/10"
            >
              {area}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Focus on these topics to improve your overall performance. The AI tutor can provide targeted practice questions.
        </p>
      </Card>
    </div>
  );
};

export default ProgressDashboard;