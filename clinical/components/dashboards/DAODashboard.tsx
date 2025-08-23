import React, { useState } from 'react';
import { User, TokenTransaction } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Vote,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Coins
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface DAODashboardProps {
  user: User;
}

// Mock DAO funding and governance data
const treasuryData = {
  totalValue: 2850000,
  availableFunding: 1200000,
  allocatedFunds: 1650000,
  distribution: [
    { name: 'Active Trials', value: 1200000, color: '#3b82f6' },
    { name: 'Research Grants', value: 450000, color: '#10b981' },
    { name: 'Infrastructure', value: 300000, color: '#f59e0b' },
    { name: 'Community Rewards', value: 150000, color: '#ef4444' },
    { name: 'Reserve Fund', value: 750000, color: '#8b5cf6' }
  ]
};

const milestoneCards = [
  {
    id: '1',
    title: 'Diabetes Trial Phase II',
    progress: 75,
    funding: 850000,
    totalBudget: 1200000,
    participants: 287,
    targetParticipants: 400,
    milestone: 'Primary endpoint data collection',
    dueDate: new Date('2024-06-15'),
    status: 'on-track',
    impact: 'High efficacy signals observed in treatment group'
  },
  {
    id: '2',
    title: 'Hypertension Digital Therapeutics',
    progress: 45,
    funding: 320000,
    totalBudget: 600000,
    participants: 156,
    targetParticipants: 300,
    milestone: 'Patient recruitment completion',
    dueDate: new Date('2024-05-30'),
    status: 'at-risk',
    impact: 'Recruitment slightly behind schedule'
  },
  {
    id: '3',
    title: 'Mental Health AI Platform',
    progress: 90,
    funding: 480000,
    totalBudget: 500000,
    participants: 198,
    targetParticipants: 200,
    milestone: 'Final data analysis',
    dueDate: new Date('2024-04-30'),
    status: 'completed',
    impact: 'Significant improvement in patient outcomes demonstrated'
  }
];

const tokenFlowData = [
  { month: 'Jan', inflow: 145000, outflow: 98000, net: 47000 },
  { month: 'Feb', inflow: 167000, outflow: 112000, net: 55000 },
  { month: 'Mar', inflow: 189000, outflow: 125000, net: 64000 },
  { month: 'Apr', inflow: 201000, outflow: 143000, net: 58000 },
  { month: 'May', inflow: 178000, outflow: 156000, net: 22000 }
];

const votingProposals = [
  {
    id: '1',
    title: 'Increase Patient Reward Pool by 25%',
    description: 'Enhance token rewards to improve data quality and retention',
    votes: { for: 2341, against: 567, abstain: 123 },
    quorum: 2500,
    status: 'active',
    deadline: new Date('2024-05-01'),
    impact: 'patient-rewards'
  },
  {
    id: '2',
    title: 'Fund New Alzheimer Research Initiative',
    description: 'Allocate $800K for novel digital biomarker study',
    votes: { for: 1876, against: 234, abstain: 89 },
    quorum: 2000,
    status: 'passed',
    deadline: new Date('2024-04-20'),
    impact: 'research-expansion'
  },
  {
    id: '3',
    title: 'Implement Quadratic Voting System',
    description: 'Replace current voting mechanism with quadratic voting',
    votes: { for: 892, against: 1456, abstain: 234 },
    quorum: 2000,
    status: 'failed',
    deadline: new Date('2024-04-15'),
    impact: 'governance-change'
  }
];

export function DAODashboard({ user }: DAODashboardProps) {
  const [selectedView, setSelectedView] = useState<'treasury' | 'milestones' | 'governance' | 'impact'>('treasury');
  const [votingPower] = useState(1250); // User's voting power

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'on-track':
        return 'info';
      case 'at-risk':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getVotePercentage = (votes: number, total: number) => {
    return ((votes / total) * 100).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">DAO Governance Dashboard</h1>
        <p className="text-purple-100 text-lg mb-6">Transparent funding and community-driven research priorities</p>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <DollarSign className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{formatCurrency(treasuryData.totalValue)}</div>
              <div className="text-sm text-purple-100">Treasury Value</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Vote className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{votingPower}</div>
              <div className="text-sm text-purple-100">Your Voting Power</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
            <Target className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{milestoneCards.length}</div>
              <div className="text-sm text-purple-100">Active Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 bg-white rounded-lg p-2 shadow-sm">
        {[
          { id: 'treasury', label: 'Treasury', icon: DollarSign },
          { id: 'milestones', label: 'Milestones', icon: Target },
          { id: 'governance', label: 'Governance', icon: Vote },
          { id: 'impact', label: 'Impact', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedView(tab.id as 'treasury' | 'milestones' | 'governance' | 'impact')}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                selectedView === tab.id 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {selectedView === 'treasury' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Treasury Donut Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Treasury Allocation</CardTitle>
                <CardDescription>
                  Total value: {formatCurrency(treasuryData.totalValue)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={treasuryData.distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {treasuryData.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {treasuryData.distribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium ml-auto">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Token Flow */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Token Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenFlowData.slice(-3).map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{month.month} 2024</span>
                        <Badge variant={month.net > 0 ? 'success' : 'warning'}>
                          {month.net > 0 ? '+' : ''}{formatCurrency(month.net)}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-600 flex items-center">
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                            Inflow
                          </span>
                          <span>{formatCurrency(month.inflow)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-600 flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            Outflow
                          </span>
                          <span>{formatCurrency(month.outflow)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedView === 'milestones' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {milestoneCards.map((milestone) => (
            <Card key={milestone.id} className="h-fit">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  <Badge variant={getStatusColor(milestone.status)}>
                    {milestone.status.replace('-', ' ')}
                  </Badge>
                </div>
                <CardDescription>{milestone.milestone}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Funding Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Funding Utilized</span>
                    <span>{formatCurrency(milestone.funding)} / {formatCurrency(milestone.totalBudget)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(milestone.funding / milestone.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Participant Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Participants</span>
                    <span>{milestone.participants} / {milestone.targetParticipants}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(milestone.participants / milestone.targetParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Due: {formatDate(milestone.dueDate)}</span>
                </div>

                {/* Impact */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Current Impact</h4>
                  <p className="text-xs text-gray-600">{milestone.impact}</p>
                </div>

                {/* Progress Ring */}
                <div className="flex justify-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${milestone.progress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium">{milestone.progress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedView === 'governance' && (
        <div className="space-y-6">
          {/* Quadratic Voting Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Quadratic Voting Calculator</CardTitle>
              <CardDescription>
                Your voting power: {votingPower} DCNET tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Votes to Cast</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="35" 
                      defaultValue="10"
                      className="flex-1"
                    />
                    <span className="w-12 text-sm">10</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Token Cost</label>
                  <div className="p-2 bg-gray-50 rounded text-lg font-medium">
                    100 DCNET
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Remaining Power</label>
                  <div className="p-2 bg-blue-50 rounded text-lg font-medium text-blue-600">
                    {votingPower - 100} DCNET
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Proposals */}
          <div className="grid grid-cols-1 gap-6">
            {votingProposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription className="mt-2">{proposal.description}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        proposal.status === 'passed' ? 'success' :
                        proposal.status === 'failed' ? 'destructive' :
                        'info'
                      }
                    >
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Voting Results */}
                    <div>
                      <h4 className="font-medium mb-3">Voting Results</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-600">For ({proposal.votes.for})</span>
                            <span>{getVotePercentage(proposal.votes.for, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${getVotePercentage(proposal.votes.for, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-red-600">Against ({proposal.votes.against})</span>
                            <span>{getVotePercentage(proposal.votes.against, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${getVotePercentage(proposal.votes.against, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Abstain ({proposal.votes.abstain})</span>
                            <span>{getVotePercentage(proposal.votes.abstain, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gray-400 h-2 rounded-full"
                              style={{ width: `${getVotePercentage(proposal.votes.abstain, proposal.votes.for + proposal.votes.against + proposal.votes.abstain)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Proposal Details */}
                    <div>
                      <h4 className="font-medium mb-3">Proposal Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Quorum Required:</span>
                          <span className="font-medium">{proposal.quorum.toLocaleString()} votes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Votes:</span>
                          <span className="font-medium">{(proposal.votes.for + proposal.votes.against + proposal.votes.abstain).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deadline:</span>
                          <span className="font-medium">{formatDate(proposal.deadline)}</span>
                        </div>
                      </div>
                      
                      {proposal.status === 'active' && (
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="default">Vote For</Button>
                          <Button size="sm" variant="outline">Vote Against</Button>
                          <Button size="sm" variant="ghost">Abstain</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
