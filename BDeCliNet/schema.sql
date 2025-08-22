-- PostgreSQL Schema for DeCliNet

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Identity Management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('patient', 'researcher', 'institution')),
    email VARCHAR(255),
    kyc_status VARCHAR(20) DEFAULT 'pending',
    reputation_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patient Demographics
CREATE TABLE patient_demographics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES users(id),
    age_group VARCHAR(10),
    gender VARCHAR(10),
    region VARCHAR(50),
    anonymized_zip VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health Data Registry (Metadata Only)
CREATE TABLE health_data_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES users(id),
    data_hash VARCHAR(64) NOT NULL,
    ipfs_hash VARCHAR(46) NOT NULL,
    metadata_hash VARCHAR(64) NOT NULL,
    data_type VARCHAR(50) NOT NULL,
    data_size BIGINT NOT NULL,
    quality_score INTEGER DEFAULT 0,
    consent_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP,
    access_count INTEGER DEFAULT 0
);

-- Consent Management
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES users(id),
    data_record_id UUID NOT NULL REFERENCES health_data_records(id),
    consent_type VARCHAR(50) NOT NULL,
    permissions JSONB NOT NULL,
    expiry_date TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research Projects
CREATE TABLE research_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    researcher_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    research_area VARCHAR(100),
    funding_goal DECIMAL(15,2),
    funding_raised DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'proposed' CHECK (status IN ('proposed', 'active', 'completed', 'cancelled')),
    blockchain_proposal_id BIGINT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Access Requests
CREATE TABLE access_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES users(id),
    dataset_id UUID NOT NULL REFERENCES health_data_records(id),
    purpose TEXT NOT NULL,
    duration INTEGER, -- in days
    requested_fields JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Access Policies
CREATE TABLE access_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    grantee_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(20) NOT NULL,
    granted BOOLEAN DEFAULT false,
    granted_by UUID REFERENCES users(id),
    granted_at TIMESTAMP,
    expires_at TIMESTAMP,
    conditions JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Model Registry
CREATE TABLE ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES users(id),
    model_name VARCHAR(255) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    description TEXT,
    ipfs_hash VARCHAR(46) NOT NULL,
    performance_metrics JSONB,
    is_federated BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Access Logs (Audit Trail)
CREATE TABLE access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES users(id),
    resource_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    allowed BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    context JSONB,
    reason TEXT
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    related_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Token Transactions
CREATE TABLE token_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    blockchain_tx_hash VARCHAR(66) NOT NULL,
    related_activity_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analysis Jobs
CREATE TABLE analysis_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    researcher_id UUID NOT NULL REFERENCES users(id),
    dataset_ids JSONB NOT NULL,
    analysis_type VARCHAR(50) NOT NULL,
    privacy_preserving BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    result_hash VARCHAR(64),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DAO Proposals
CREATE TABLE dao_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposer_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proposal_type VARCHAR(50) NOT NULL,
    funding_amount DECIMAL(20,8),
    recipient_id UUID REFERENCES users(id),
    blockchain_proposal_id BIGINT,
    voting_ends_at TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'passed', 'rejected', 'executed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DAO Votes
CREATE TABLE dao_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID NOT NULL REFERENCES dao_proposals(id),
    voter_id UUID NOT NULL REFERENCES users(id),
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('for', 'against', 'abstain')),
    vote_weight DECIMAL(20,8) NOT NULL,
    blockchain_tx_hash VARCHAR(66),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(proposal_id, voter_id)
);

-- Indexes for Performance
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_health_data_patient ON health_data_records(patient_id);
CREATE INDEX idx_health_data_type ON health_data_records(data_type);
CREATE INDEX idx_consent_patient ON consent_records(patient_id);
CREATE INDEX idx_consent_active ON consent_records(is_active);
CREATE INDEX idx_consent_data_record ON consent_records(data_record_id);
CREATE INDEX idx_access_requests_dataset ON access_requests(dataset_id);
CREATE INDEX idx_access_requests_status ON access_requests(status);
CREATE INDEX idx_access_logs_requester ON access_logs(requester_id);
CREATE INDEX idx_access_logs_resource ON access_logs(resource_id);
CREATE INDEX idx_access_logs_time ON access_logs(timestamp);
CREATE INDEX idx_access_policies_resource ON access_policies(resource_id, resource_type);
CREATE INDEX idx_access_policies_grantee ON access_policies(grantee_id);
CREATE INDEX idx_research_projects_researcher ON research_projects(researcher_id);
CREATE INDEX idx_research_projects_status ON research_projects(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_dao_proposals_status ON dao_proposals(status);
CREATE INDEX idx_dao_votes_proposal ON dao_votes(proposal_id);
CREATE INDEX idx_token_transactions_user ON token_transactions(user_id);