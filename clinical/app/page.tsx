'use client';

import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { PatientDashboard } from '@/components/dashboards/PatientDashboard';
import { ResearcherDashboard } from '@/components/dashboards/ResearcherDashboard';
import { DAODashboard } from '@/components/dashboards/DAODashboard';
import { AuditorDashboard } from '@/components/dashboards/AuditorDashboard';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { ConsentStrip } from '@/components/ConsentStrip';
import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';

// Mock user data for demo
const mockUsers: Record<UserRole, User> = {
  patient: {
    id: 'patient-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'patient',
    walletAddress: '0x1234...5678',
    avatar: '/avatars/patient.png'
  },
  researcher: {
    id: 'researcher-1',
    name: 'Dr. Michael Chen',
    email: 'dr.chen@hospital.com',
    role: 'researcher',
    walletAddress: '0x2345...6789',
    avatar: '/avatars/researcher.png'
  },
  dao: {
    id: 'dao-1',
    name: 'DAO Member Alex',
    email: 'alex@dao.org',
    role: 'dao',
    walletAddress: '0x3456...7890',
    avatar: '/avatars/dao.png'
  },
  auditor: {
    id: 'auditor-1',
    name: 'Emma Wilson',
    email: 'emma.wilson@audit.com',
    role: 'auditor',
    walletAddress: '0x4567...8901',
    avatar: '/avatars/auditor.png'
  }
};

export default function ClinicalDashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>('researcher');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.researcher);
  const [isDemoModeOpen, setIsDemoModeOpen] = useState(true); // Start with demo mode open for better UX

  useEffect(() => {
    setCurrentUser(mockUsers[currentRole]);
  }, [currentRole]);

  // Load demo mode state from localStorage on mount
  useEffect(() => {
    const savedDemoMode = localStorage.getItem('demoModeOpen');
    if (savedDemoMode !== null) {
      setIsDemoModeOpen(JSON.parse(savedDemoMode));
    }
  }, []);

  // Save demo mode state to localStorage
  useEffect(() => {
    localStorage.setItem('demoModeOpen', JSON.stringify(isDemoModeOpen));
  }, [isDemoModeOpen]);

  // Keyboard shortcuts for demo mode
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only listen for shortcuts when alt key is pressed
      if (event.altKey) {
        switch (event.key) {
          case '1':
            setCurrentRole('patient');
            break;
          case '2':
            setCurrentRole('researcher');
            break;
          case '3':
            setCurrentRole('dao');
            break;
          case '4':
            setCurrentRole('auditor');
            break;
          case 'd':
            setIsDemoModeOpen(!isDemoModeOpen);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDemoModeOpen]);

  const renderDashboard = () => {
    switch (currentRole) {
      case 'patient':
        return <PatientDashboard user={currentUser} />;
      case 'researcher':
        return <ResearcherDashboard user={currentUser} />;
      case 'dao':
        return <DAODashboard user={currentUser} />;
      case 'auditor':
        return <AuditorDashboard user={currentUser} />;
      default:
        return <PatientDashboard user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar user={currentUser} />
      
      {/* Demo Mode Toggle Button */}
      <div className="fixed top-20 right-6 z-50 flex flex-col items-end gap-2">
        {/* Current Role Indicator */}
        <div className="bg-[#DF7373] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} View
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDemoModeOpen(!isDemoModeOpen)}
          className="bg-card/95 backdrop-blur-sm border-border shadow-lg"
        >
          {isDemoModeOpen ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          <span className="ml-2 text-xs">Demo Mode</span>
        </Button>
        
        {/* Role Switcher for Demo */}
        {isDemoModeOpen && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            <RoleSwitcher currentRole={currentRole} onRoleChange={setCurrentRole} />
          </div>
        )}
      </div>

      {/* Persistent Consent Strip */}
      <ConsentStrip user={currentUser} />

      {/* Main Dashboard Content */}
      <main className="pt-24 pb-12">
        {renderDashboard()}
      </main>
    </div>
  );
}
