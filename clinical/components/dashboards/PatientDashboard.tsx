import React, { useState } from 'react';
import { User, HealthMetric, Milestone, Treatment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Plus, 
  Calendar,
  Activity,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PatientDashboardProps {
  user: User;
}

// Mock data for patient health journey
const healthData = [
  { date: '2024-01-01', glucose: 180, target: 140, medication: 'Started Metformin' },
  { date: '2024-01-15', glucose: 165, target: 140 },
  { date: '2024-02-01', glucose: 155, target: 140 },
  { date: '2024-02-15', glucose: 145, target: 140, medication: 'Dosage increased' },
  { date: '2024-03-01', glucose: 138, target: 140 },
  { date: '2024-03-15', glucose: 135, target: 140 },
  { date: '2024-04-01', glucose: 132, target: 140 },
  { date: '2024-04-15', glucose: 128, target: 140 },
];

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Daily Glucose Logging',
    description: 'Log glucose readings twice daily',
    targetDate: new Date('2024-05-01'),
    progress: 85,
    reward: 50,
    type: 'data_collection'
  },
  {
    id: '2',
    title: 'Medication Adherence',
    description: 'Take medication as prescribed',
    targetDate: new Date('2024-05-01'),
    progress: 92,
    reward: 75,
    type: 'treatment_adherence'
  },
  {
    id: '3',
    title: 'Weekly Check-ins',
    description: 'Complete weekly health surveys',
    targetDate: new Date('2024-05-01'),
    progress: 60,
    reward: 25,
    type: 'follow_up'
  }
];

const currentTreatment: Treatment = {
  id: '1',
  name: 'Type 2 Diabetes Management',
  startDate: new Date('2024-01-01'),
  description: 'Comprehensive diabetes management with Metformin and lifestyle changes',
  dosage: '500mg',
  frequency: 'Twice daily'
};

export function PatientDashboard({ user }: PatientDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<'glucose' | 'weight' | 'blood_pressure'>('glucose');

  const currentGlucose = healthData[healthData.length - 1].glucose;
  const previousGlucose = healthData[healthData.length - 2].glucose;
  const improvement = previousGlucose - currentGlucose;
  const improvementPercent = ((improvement / previousGlucose) * 100).toFixed(1);

  const totalTokensEarned = milestones.reduce((sum, milestone) => 
    sum + (milestone.progress >= 100 ? milestone.reward : 0), 0
  );

  const avgProgress = milestones.reduce((sum, milestone) => sum + milestone.progress, 0) / milestones.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-green-100 text-lg mb-6">Your health journey is showing great progress. Keep it up!</p>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Award className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{totalTokensEarned}</div>
              <div className="text-sm text-green-100">DCNET Tokens Earned</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Target className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{avgProgress.toFixed(0)}%</div>
              <div className="text-sm text-green-100">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart - Before vs After */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Health Journey: Before vs. After Treatment</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Glucose levels over time showing treatment effectiveness
                  </CardDescription>
                </div>
                <Badge variant="success" className="px-3 py-1">
                  {improvement > 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                  {improvementPercent}% improvement
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="#64748b"
                    />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      labelFormatter={(date) => formatDate(date)}
                      formatter={(value, name) => [
                        `${value} mg/dL`,
                        name === 'glucose' ? 'Glucose Level' : 'Target'
                      ]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.1}
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="flex items-center space-x-6 text-sm bg-gray-50 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="font-medium">Actual Glucose</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-500 bg-opacity-20"></div>
                    <span className="font-medium">Target Range</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Ring Progress */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Active Milestones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{milestone.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2 font-semibold">
                      {milestone.reward} DCNET
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{milestone.progress}% complete</span>
                      <span className="text-gray-500">
                        Due {formatDate(milestone.targetDate)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          milestone.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(milestone.progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {milestone.progress >= 100 && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 rounded-md px-3 py-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Completed! Reward claimed.</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Smart Nudges */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Smart Nudges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-blue-800">Medication Reminder</p>
                    <p className="text-xs text-blue-600 mt-1">Evening dose due in 2 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <div className="flex items-start space-x-3">
                  <Activity className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-green-800">Data Entry</p>
                    <p className="text-xs text-green-600 mt-1">Log today&apos;s morning glucose reading</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-purple-800">Bonus Opportunity</p>
                    <p className="text-xs text-purple-600 mt-1">Complete weekly survey for 10 extra DCNET</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Current Treatment Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Current Treatment Plan</CardTitle>
            <CardDescription>Active since {formatDate(currentTreatment.startDate)}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold text-xl mb-3 text-gray-900">{currentTreatment.name}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{currentTreatment.description}</p>
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Dosage:</span>
                <span className="text-sm font-bold text-gray-900">{currentTreatment.dosage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Frequency:</span>
                <span className="text-sm font-bold text-gray-900">{currentTreatment.frequency}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Log data and track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start h-12 text-left bg-blue-600 hover:bg-blue-700 transition-colors" variant="default">
              <Plus className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Log Glucose Reading</div>
                <div className="text-xs opacity-90">Quick entry for today&apos;s reading</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-12 text-left hover:bg-gray-50 transition-colors" variant="outline">
              <Calendar className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Schedule Appointment</div>
                <div className="text-xs text-gray-500">Book your next check-up</div>
              </div>
            </Button>
            <Button className="w-full justify-start h-12 text-left hover:bg-gray-50 transition-colors" variant="outline">
              <Activity className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">View Full Health History</div>
                <div className="text-xs text-gray-500">Complete medical timeline</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
