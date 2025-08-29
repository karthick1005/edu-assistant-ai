import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  buttonText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  isActive = false,
  onClick,
  buttonText = "Activate"
}) => {
  return (
    <Card className={`p-8 glass-card shadow-strong hover-lift transition-spring group ${
      isActive ? 'ring-2 ring-primary/30 shadow-glow' : ''
    }`}>
      <div className="flex items-start gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-spring ${
          isActive ? 'gradient-neural shadow-neural' : 'bg-muted/50 group-hover:gradient-primary'
        }`}>
          <Icon className={`w-7 h-7 transition-smooth ${
            isActive ? 'text-white' : 'text-muted-foreground group-hover:text-white'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {description}
          </p>
          
          {onClick && (
            <Button 
              onClick={onClick}
              variant={isActive ? "secondary" : "hero"}
              size="sm"
              className={`w-full h-11 font-medium transition-spring ${
                isActive 
                  ? 'gradient-primary text-white shadow-glow' 
                  : 'hover-glow border-primary/20 hover:border-primary'
              }`}
            >
              {isActive ? "✓ Active" : buttonText}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;