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
    <Card className={`p-6 gradient-card shadow-medium transition-smooth hover:shadow-strong ${
      isActive ? 'ring-2 ring-primary shadow-glow' : ''
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isActive ? 'gradient-primary' : 'bg-muted'
        }`}>
          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {onClick && (
            <Button 
              onClick={onClick}
              variant={isActive ? "secondary" : "hero"}
              size="sm"
              className="w-full"
            >
              {isActive ? "Active" : buttonText}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;