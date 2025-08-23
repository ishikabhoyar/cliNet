import React from 'react';
import { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Bell, Settings, User as UserIcon, Wallet } from 'lucide-react';

interface NavBarProps {
  user: User;
}

export function NavBar({ user }: NavBarProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'researcher':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'dao':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'auditor':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#DF7373] rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CliNet</h1>
                <p className="text-xs text-muted-foreground leading-none">Clinical Insights Network</p>
              </div>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Wallet Address */}
            <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">{user.walletAddress}</span>
            </div>

            {/* Role Badge */}
            <Badge className={`${getRoleColor(user.role)} font-semibold px-3 py-1 border-0`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-[#DF7373] rounded-full flex items-center justify-center shadow-sm">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
