import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  syllabus?: string;
}

interface TutorChatProps {
  selectedSyllabus: string;
  onSyllabusChange: (syllabus: string) => void;
  isQuizMode: boolean;
}

const TutorChat: React.FC<TutorChatProps> = ({ 
  selectedSyllabus, 
  onSyllabusChange, 
  isQuizMode 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI tutor. I can help you with questions from NCERT and Samacheer Kalvi syllabus. Upload some PDFs and ask me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      syllabus: selectedSyllabus
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call your Python FastAPI backend
      const response = await fetch('http://localhost:8000/ask-question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputText,
          syllabus: selectedSyllabus,
          quiz_mode: isQuizMode
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer + (data.quiz_questions && data.quiz_questions.length > 0 
          ? '\n\n🧠 Quiz Questions:\n' + data.quiz_questions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')
          : ''),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling backend:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I couldn't process your question. Please make sure:\n1. The backend server is running on http://localhost:8000\n2. PDFs are uploaded for the ${selectedSyllabus.toUpperCase()} syllabus\n3. Your OpenAI API key is configured\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col gradient-card shadow-medium">
      <div className="p-4 border-b bg-gradient-primary rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Tutor</h3>
              <p className="text-xs text-white/80">Ready to help you learn</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isQuizMode && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Quiz Mode
              </Badge>
            )}
            <Select value={selectedSyllabus} onValueChange={onSyllabusChange}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ncert">NCERT</SelectItem>
                <SelectItem value="samacheer">Samacheer Kalvi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'gradient-primary' 
                  : 'bg-secondary'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`chat-bubble ${
                message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {message.syllabus && (
                    <Badge variant="outline" className="text-xs">
                      {message.syllabus}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble chat-bubble-bot">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your syllabus..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="gradient-primary shadow-medium"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TutorChat;