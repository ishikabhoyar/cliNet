export type UserRole = 'patient' | 'researcher' | 'dao' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
  avatar?: string;
}

export interface HealthMetric {
  id: string;
  type: 'glucose' | 'blood_pressure' | 'heart_rate' | 'weight' | 'tumor_size';
  value: number;
  unit: string;
  timestamp: Date;
  notes?: string;
  verified: boolean;
}

export interface Treatment {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  dosage?: string;
  frequency?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completedDate?: Date;
  progress: number; // 0-100
  reward: number; // DCNET tokens
  type: 'data_collection' | 'treatment_adherence' | 'follow_up' | 'outcome_measurement';
}

export interface ConsentRecord {
  id: string;
  type: 'data_sharing' | 'treatment_participation' | 'research_access';
  status: 'active' | 'revoked' | 'expired';
  grantedDate: Date;
  expiryDate?: Date;
  blockchainHash: string;
  permissions: string[];
}

export interface ClinicalTrial {
  id: string;
  title: string;
  description: string;
  phase: 'I' | 'II' | 'III' | 'IV';
  status: 'recruiting' | 'active' | 'completed' | 'suspended';
  participantCount: number;
  targetParticipants: number;
  primaryEndpoint: string;
  secondaryEndpoints: string[];
  fundingGoal: number;
  fundingRaised: number;
  startDate: Date;
  estimatedCompletionDate: Date;
}

export interface RiskMetric {
  category: string;
  value: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trend: 'improving' | 'stable' | 'worsening';
  lastUpdated: Date;
}

export interface TokenTransaction {
  id: string;
  type: 'reward' | 'payment' | 'grant' | 'penalty';
  amount: number;
  from?: string;
  to?: string;
  timestamp: Date;
  description: string;
  blockchainHash: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: Date;
  blockchainHash: string;
  ipAddress: string;
  details: Record<string, any>;
}
