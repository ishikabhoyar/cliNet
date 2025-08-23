import React, { useState } from 'react';
import { User, ClinicalTrial, RiskMetric } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Activity,
  FileText,
  Shield,
  Zap
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

interface ResearcherDashboardProps {
  user: User;
}

// Mock data for clinical trials and cohorts
const activeTrial: ClinicalTrial = {
  id: 'trial-001',
  title: 'Diabetes Management with Digital Therapeutics',
  description: 'Phase II study evaluating the efficacy of AI-driven glucose monitoring and intervention',
  phase: 'II',
  status: 'active',
  participantCount: 287,
  targetParticipants: 400,
  primaryEndpoint: 'HbA1c reduction ≥ 1.0%',
  secondaryEndpoints: ['Weight loss', 'Medication adherence', 'Quality of life scores'],
  fundingGoal: 1200000,
  fundingRaised: 850000,
  startDate: new Date('2024-01-15'),
  estimatedCompletionDate: new Date('2025-06-15')
};

const cohortData = [
  { group: 'Control', participants: 95, avgImprovement: 0.3, riskLevel: 'low' },
  { group: 'Digital Therapeutics', participants: 98, avgImprovement: 1.2, riskLevel: 'low' },
  { group: 'AI + Coaching', participants: 94, avgImprovement: 1.8, riskLevel: 'medium' }
];

const riskMetrics: RiskMetric[] = [
  {
    category: 'Adverse Events',
    value: 12,
    severity: 'low',
    trend: 'stable',
    lastUpdated: new Date('2024-04-20')
  },
  {
    category: 'Drop-out Rate',
    value: 8.5,
    severity: 'medium',
    trend: 'improving',
    lastUpdated: new Date('2024-04-20')
  },
  {
    category: 'Protocol Deviations',
    value: 3.2,
    severity: 'low',
    trend: 'improving',
    lastUpdated: new Date('2024-04-20')
  },
  {
    category: 'Data Quality Issues',
    value: 1.8,
    severity: 'low',
    trend: 'stable',
    lastUpdated: new Date('2024-04-20')
  }
];

const efficacyData = [
  { week: 'Week 1', control: 8.2, treatment: 8.1, target: 7.0 },
  { week: 'Week 4', control: 8.0, treatment: 7.8, target: 7.0 },
  { week: 'Week 8', control: 7.9, treatment: 7.3, target: 7.0 },
  { week: 'Week 12', control: 7.8, treatment: 6.9, target: 7.0 },
  { week: 'Week 16', control: 7.7, treatment: 6.4, target: 7.0 },
];

const recruitmentData = [
  { month: 'Jan', target: 50, actual: 45, cumulative: 45 },
  { month: 'Feb', target: 100, actual: 52, cumulative: 97 },
  { month: 'Mar', target: 150, actual: 48, cumulative: 145 },
  { month: 'Apr', target: 200, actual: 51, cumulative: 196 },
  { month: 'May', target: 250, actual: 49, cumulative: 245 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function ResearcherDashboard({ user }: ResearcherDashboardProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'efficacy' | 'safety' | 'recruitment'>('overview');

  const participationRate = (activeTrial.participantCount / activeTrial.targetParticipants * 100).toFixed(1);
  const fundingRate = (activeTrial.fundingRaised / activeTrial.fundingGoal * 100).toFixed(1);

  const getSignalColor = (trend: string, severity: string) => {
    if (severity === 'critical') return 'text-red-600';
    if (severity === 'high') return 'text-orange-600';
    if (trend === 'worsening') return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Clinical Research Dashboard</h1>
        <p className="text-blue-100 text-lg mb-6">Real-time cohort monitoring and safety signals</p>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Users className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{activeTrial.participantCount}</div>
              <div className="text-sm text-blue-100">Active Participants</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Target className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{participationRate}%</div>
              <div className="text-sm text-blue-100">Enrollment</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Shield className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">Phase {activeTrial.phase}</div>
              <div className="text-sm text-blue-100">Trial Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 bg-white rounded-lg p-2 shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'efficacy', label: 'Efficacy', icon: TrendingUp },
          { id: 'safety', label: 'Safety Signals', icon: Shield },
          { id: 'recruitment', label: 'Recruitment', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedView(tab.id as 'overview' | 'efficacy' | 'safety' | 'recruitment')}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                selectedView === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trial Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Trial: {activeTrial.title}</CardTitle>
                <CardDescription>
                  Phase {activeTrial.phase} • Started {formatDate(activeTrial.startDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{activeTrial.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Primary Endpoint</h4>
                    <p className="text-lg">{activeTrial.primaryEndpoint}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Estimated Completion</h4>
                    <p className="text-lg">{formatDate(activeTrial.estimatedCompletionDate)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Participant Enrollment</span>
                      <span>{activeTrial.participantCount} / {activeTrial.targetParticipants}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${participationRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Progress</span>
                      <span>{formatCurrency(activeTrial.fundingRaised)} / {formatCurrency(activeTrial.fundingGoal)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${fundingRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Heat Map */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Risk Heat Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskMetrics.map((metric) => (
                  <div key={metric.category} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{metric.category}</h4>
                      <Badge 
                        variant={
                          metric.severity === 'critical' ? 'destructive' :
                          metric.severity === 'high' ? 'warning' :
                          metric.severity === 'medium' ? 'secondary' : 'success'
                        }
                      >
                        {metric.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <div className={`flex items-center space-x-1 ${getSignalColor(metric.trend, metric.severity)}`}>
                        {metric.trend === 'improving' && <TrendingUp className="w-4 h-4" />}
                        {metric.trend === 'worsening' && <AlertTriangle className="w-4 h-4" />}
                        {metric.trend === 'stable' && <CheckCircle className="w-4 h-4" />}
                        <span className="text-sm capitalize">{metric.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedView === 'efficacy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Primary Endpoint: HbA1c Levels Over Time</CardTitle>
              <CardDescription>
                Comparing treatment groups against target endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficacyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="control" 
                      stroke="#6b7280" 
                      strokeWidth={2}
                      name="Control Group"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="treatment" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Treatment Group"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cohort Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohortData.map((group, index) => (
                  <div key={group.group} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{group.group}</h4>
                      <Badge 
                        variant={group.riskLevel === 'low' ? 'success' : 'warning'}
                      >
                        {group.riskLevel} risk
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Participants:</span>
                        <span className="font-medium">{group.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Improvement:</span>
                        <span className="font-medium text-green-600">
                          {group.avgImprovement}% HbA1c reduction
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-green-800">Efficacy Signal</p>
                    <p className="text-xs text-green-600">Treatment group showing 60% improvement over control</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-sm text-blue-800">Adaptive Design Trigger</p>
                    <p className="text-xs text-blue-600">Consider increasing sample size for AI + Coaching arm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'recruitment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recruitment Funnel</CardTitle>
              <CardDescription>Monthly enrollment vs. targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recruitmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
