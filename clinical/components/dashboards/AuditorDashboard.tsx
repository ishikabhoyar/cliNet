import React, { useState } from 'react';
import { User, AuditLog, ConsentRecord } from '@/types';
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Shield, 
  Download, 
  Search, 
  Filter,
  FileText,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
  Hash,
  Eye,
  ExternalLink,
  Database,
  Users,
  Activity
} from 'lucide-react';
import { formatDateTime, formatDate } from '@/lib/utils';

interface AuditorDashboardProps {
  user: User;
}

// Mock audit data
const auditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'Data Access',
    actor: 'researcher@hospital.com',
    target: 'Patient Health Record #1234',
    timestamp: new Date('2024-04-20T14:30:00'),
    blockchainHash: '0xabcd1234...efgh5678',
    ipAddress: '192.168.1.100',
    details: {
      recordType: 'glucose_readings',
      accessType: 'read',
      consentId: 'consent-789',
      duration: '15 minutes'
    }
  },
  {
    id: '2',
    action: 'Consent Modification',
    actor: 'patient@email.com',
    target: 'Data Sharing Consent',
    timestamp: new Date('2024-04-20T10:15:00'),
    blockchainHash: '0x1234abcd...5678efgh',
    ipAddress: '10.0.0.25',
    details: {
      previousState: 'full_access',
      newState: 'limited_access',
      permissions: ['research_only'],
      expiryDate: '2024-10-20'
    }
  },
  {
    id: '3',
    action: 'Token Transfer',
    actor: 'dao-treasury',
    target: 'Research Grant Distribution',
    timestamp: new Date('2024-04-19T16:45:00'),
    blockchainHash: '0x5678efgh...1234abcd',
    ipAddress: '172.16.0.10',
    details: {
      amount: 50000,
      currency: 'DCNET',
      recipient: 'trial-001',
      purpose: 'milestone_completion'
    }
  }
];

const consentRecords: ConsentRecord[] = [
  {
    id: 'consent-001',
    type: 'data_sharing',
    status: 'active',
    grantedDate: new Date('2024-01-15'),
    expiryDate: new Date('2024-07-15'),
    blockchainHash: '0xabc123...def456',
    permissions: ['research_access', 'analytics', 'reporting']
  },
  {
    id: 'consent-002',
    type: 'treatment_participation',
    status: 'active',
    grantedDate: new Date('2024-02-01'),
    expiryDate: new Date('2025-02-01'),
    blockchainHash: '0xdef456...ghi789',
    permissions: ['medication_tracking', 'outcome_measurement', 'follow_up']
  },
  {
    id: 'consent-003',
    type: 'research_access',
    status: 'revoked',
    grantedDate: new Date('2024-01-01'),
    expiryDate: new Date('2024-04-15'),
    blockchainHash: '0xghi789...jkl012',
    permissions: ['limited_access']
  }
];

const complianceMetrics = [
  { category: 'Data Access', compliant: 98.5, violations: 3, total: 200 },
  { category: 'Consent Management', compliant: 99.2, violations: 1, total: 125 },
  { category: 'Token Transfers', compliant: 100, violations: 0, total: 89 },
  { category: 'Export Controls', compliant: 97.8, violations: 2, total: 92 }
];

const activityTrends = [
  { date: '2024-04-15', dataAccess: 45, consentChanges: 8, tokenTx: 12 },
  { date: '2024-04-16', dataAccess: 52, consentChanges: 6, tokenTx: 15 },
  { date: '2024-04-17', dataAccess: 38, consentChanges: 12, tokenTx: 9 },
  { date: '2024-04-18', dataAccess: 61, consentChanges: 4, tokenTx: 18 },
  { date: '2024-04-19', dataAccess: 49, consentChanges: 9, tokenTx: 14 },
  { date: '2024-04-20', dataAccess: 55, consentChanges: 7, tokenTx: 11 }
];

const RISK_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export function AuditorDashboard({ user }: AuditorDashboardProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'audit-trail' | 'consent' | 'compliance'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuditMode, setShowAuditMode] = useState(false);

  const totalAuditEvents = auditLogs.length;
  const avgCompliance = complianceMetrics.reduce((sum, metric) => sum + metric.compliant, 0) / complianceMetrics.length;
  const totalViolations = complianceMetrics.reduce((sum, metric) => sum + metric.violations, 0);

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 99) return '#10b981';
    if (percentage >= 95) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'revoked':
        return 'destructive';
      case 'expired':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const exportAuditReport = () => {
    // Mock export functionality
    console.log('Exporting audit report with hash verification...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Audit & Compliance Dashboard</h1>
            <p className="text-orange-100 text-lg mb-6">Immutable blockchain audit trail and regulatory compliance</p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
                <Database className="w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold">{totalAuditEvents}k+</div>
                  <div className="text-sm text-orange-100">Events Logged</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
                <Shield className="w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold">{avgCompliance.toFixed(1)}%</div>
                  <div className="text-sm text-orange-100">Avg Compliance</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
                <AlertTriangle className="w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold">{totalViolations}</div>
                  <div className="text-sm text-orange-100">Active Violations</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
              onClick={() => setShowAuditMode(!showAuditMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showAuditMode ? 'Exit' : 'Enter'} Audit Mode
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
              onClick={exportAuditReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Audit Mode Overlay */}
      {showAuditMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-3 text-yellow-800">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Audit Mode Active</span>
          </div>
          <p className="text-yellow-700 text-sm mt-2">
            All interactions are being logged with cryptographic hashes. Element-level verification enabled.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 bg-white rounded-lg p-2 shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'audit-trail', label: 'Audit Trail', icon: FileText },
          { id: 'consent', label: 'Consent Timeline', icon: Lock },
          { id: 'compliance', label: 'Compliance', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={selectedView === tab.id ? "default" : "ghost"}
              onClick={() => setSelectedView(tab.id as 'overview' | 'audit-trail' | 'consent' | 'compliance')}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                selectedView === tab.id 
                  ? 'bg-orange-600 text-white shadow-md' 
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
          {/* Activity Trends */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Activity Trends</CardTitle>
                <CardDescription>Daily audit events across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => formatDate(date)}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="dataAccess" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Data Access"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="consentChanges" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Consent Changes"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tokenTx" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Token Transactions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceMetrics.map((metric) => (
                  <div key={metric.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.category}</span>
                      <Badge 
                        variant={metric.compliant >= 99 ? 'success' : metric.compliant >= 95 ? 'warning' : 'destructive'}
                      >
                        {metric.compliant}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${metric.compliant}%`,
                          backgroundColor: getComplianceColor(metric.compliant)
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{metric.violations} violations</span>
                      <span>{metric.total} total events</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedView === 'audit-trail' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search audit logs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log Entries */}
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <Card key={log.id} className={showAuditMode ? 'border-yellow-300 shadow-lg' : ''}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Action & Actor</h4>
                      <p className="font-semibold">{log.action}</p>
                      <p className="text-sm text-gray-600">{log.actor}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Target</h4>
                      <p className="font-medium">{log.target}</p>
                      <p className="text-xs text-gray-500">{log.ipAddress}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Timestamp</h4>
                      <p className="font-medium">{formatDateTime(log.timestamp)}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-mono text-gray-500">
                          {log.blockchainHash}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View on Chain
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Eye className="w-3 h-3 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                  
                  {showAuditMode && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-sm text-yellow-800 mb-2">Audit Details</h5>
                      <pre className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'consent' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consent Timeline & Blockchain Records</CardTitle>
              <CardDescription>
                Immutable consent history with cryptographic verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consentRecords.map((consent) => (
                  <div key={consent.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Consent Type</h4>
                        <p className="font-semibold capitalize">{consent.type.replace('_', ' ')}</p>
                        <Badge variant={getStatusColor(consent.status)} className="mt-1">
                          {consent.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Timeline</h4>
                        <p className="text-sm">Granted: {formatDate(consent.grantedDate)}</p>
                        {consent.expiryDate && (
                          <p className="text-sm">Expires: {formatDate(consent.expiryDate)}</p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Permissions</h4>
                        <div className="flex flex-wrap gap-1">
                          {consent.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Blockchain Proof</h4>
                        <div className="flex items-center space-x-1">
                          <Hash className="w-3 h-3 text-gray-400" />
                          <span className="text-xs font-mono text-gray-600">
                            {consent.blockchainHash}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-1 p-0 h-auto">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Bar 
                      dataKey="compliant" 
                      fill="#3b82f6"
                      name="Compliance %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Package Generator</CardTitle>
              <CardDescription>
                Generate cryptographically signed audit packages for regulators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="date" 
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="2024-04-01"
                  />
                  <input 
                    type="date" 
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="2024-04-20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Include</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Audit trail logs</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Consent records</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Token transactions</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Patient data (anonymized)</span>
                  </label>
                </div>
              </div>
              
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Generate Signed Package
              </Button>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  Export packages include SHA-256 hashes and digital signatures for integrity verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
