import React from 'react';
import { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ConsentStripProps {
  user: User;
}

export function ConsentStrip({ user }: ConsentStripProps) {
  // Mock consent data
  const consentData = {
    dataSharing: { status: 'active', expiresIn: '6 months' },
    treatmentParticipation: { status: 'active', expiresIn: '1 year' },
    researchAccess: { status: 'limited', expiresIn: '3 months' }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'limited':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-0 text-xs">Active</Badge>;
      case 'limited':
        return <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">Limited</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Inactive</Badge>;
    }
  };

  return (
    <div className="sticky top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#DF7373]" />
              <span className="font-semibold text-foreground text-sm">Consent Status</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                {getStatusIcon(consentData.dataSharing.status)}
                <span className="text-xs text-muted-foreground">Data Sharing</span>
                {getStatusBadge(consentData.dataSharing.status)}
              </div>
              
              <div className="flex items-center space-x-1.5">
                {getStatusIcon(consentData.treatmentParticipation.status)}
                <span className="text-xs text-muted-foreground">Treatment</span>
                {getStatusBadge(consentData.treatmentParticipation.status)}
              </div>
              
              <div className="flex items-center space-x-1.5">
                {getStatusIcon(consentData.researchAccess.status)}
                <span className="text-xs text-muted-foreground">Research Access</span>
                {getStatusBadge(consentData.researchAccess.status)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Last updated: 2 hours ago</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs h-7 px-3">
              Manage Consent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
