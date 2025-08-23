import React from 'react';
import { User, UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity, Shield, Users, FileText } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleConfig = {
  patient: {
    label: 'Patient',
    icon: Activity,
    color: 'bg-green-500',
    description: 'Health data journey',
    bgColor: 'bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30',
    textColor: 'text-green-700 dark:text-green-400',
    shortcut: '1'
  },
  researcher: {
    label: 'Researcher',
    icon: FileText,
    color: 'bg-[#DF7373]',
    description: 'Clinical oversight',
    bgColor: 'bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30',
    textColor: 'text-red-700 dark:text-red-400',
    shortcut: '2'
  },
  dao: {
    label: 'DAO',
    icon: Users,
    color: 'bg-purple-500',
    description: 'Funding governance',
    bgColor: 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/30',
    textColor: 'text-purple-700 dark:text-purple-400',
    shortcut: '3'
  },
  auditor: {
    label: 'Auditor',
    icon: Shield,
    color: 'bg-orange-500',
    description: 'Compliance tracking',
    bgColor: 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30',
    textColor: 'text-orange-700 dark:text-orange-400',
    shortcut: '4'
  }
};

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <Card className="p-4 shadow-lg border border-border bg-card/95 backdrop-blur-sm">
      <div className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Demo Mode</div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(roleConfig).map(([role, config]) => {
          const Icon = config.icon;
          const isActive = currentRole === role;
          
          return (
            <Button
              key={role}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onRoleChange(role as UserRole)}
              className={`flex flex-col items-center gap-1.5 h-auto py-3 px-3 transition-all duration-200 border-0 relative ${
                isActive 
                  ? 'bg-[#DF7373] text-white shadow-md transform scale-105' 
                  : `${config.bgColor} ${config.textColor}`
              }`}
            >
              {/* Keyboard shortcut indicator */}
              <span className={`absolute top-1 right-1 text-xs font-mono w-4 h-4 rounded-full flex items-center justify-center ${
                isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-black/40'
              }`}>
                {config.shortcut}
              </span>
              
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                isActive ? 'bg-white/20' : config.color
              }`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-xs font-semibold">{config.label}</span>
            </Button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-2">
          {roleConfig[currentRole].description}
        </p>
        <p className="text-xs text-muted-foreground text-center opacity-70">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + 1-4</kbd> or <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + D</kbd>
        </p>
      </div>
    </Card>
  );
}
