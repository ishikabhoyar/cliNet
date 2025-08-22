# DeCliNet: Complete Technical Specification & Implementation Guide
## AI-Powered Decentralized Clinical Data Network on BNB Chain

***

## 📋 Table of Contents

1. **Executive Summary & Project Overview**
2. **Detailed Problem Analysis & Market Research**
3. **Comprehensive Solution Architecture**
4. **Technical Stack & Infrastructure**
5. **Smart Contract System Design**
6. **Database Architecture & Data Management**
7. **AI/ML Implementation Strategy**
8. **Frontend & User Experience Design**
9. **Security & Privacy Implementation**
10. **Tokenomics & Governance System**
11. **Step-by-Step Development Guide**
12. **Code Examples & Implementations**
13. **User Journey & Flow Documentation**
14. **Testing & Quality Assurance**
15. **Deployment & DevOps Strategy**
16. **Go-to-Market & Business Strategy**
17. **Future Roadmap & Scaling**

***

## 1. Executive Summary & Project Overview

### 🎯 Vision Statement
DeCliNet aims to revolutionize medical research by creating the world's first decentralized, AI-powered clinical data network built on BNB Chain that puts patients in control of their health data while accelerating life-saving research through community-driven funding and privacy-preserving analytics.

### 🚀 Core Value Propositions

**For Patients:**
- **Data Sovereignty**: Complete control over personal health data
- **Financial Rewards**: Earn DCNET tokens for contributing valuable data
- **Research Impact**: Directly contribute to medical breakthroughs
- **Privacy Protection**: Advanced cryptographic privacy guarantees

**For Researchers:**
- **Global Data Access**: Access to diverse, high-quality datasets
- **Decentralized Funding**: Community-driven research financing
- **AI-Powered Analytics**: Privacy-preserving machine learning tools
- **Transparent Collaboration**: Open, verifiable research processes

**For Healthcare Providers:**
- **Population Health Insights**: Real-time health analytics
- **Clinical Decision Support**: AI-powered diagnostic assistance
- **Patient Engagement**: Enhanced patient data sharing incentives
- **Research Collaboration**: Direct access to clinical trials

### 📊 Market Opportunity
- **$13.2B** Clinical Data Management Market (12% CAGR)
- **$7.8B** Healthcare Analytics Market (expanding rapidly)
- **500M+** patients participating in clinical research annually
- **$2.3B** DeSci market potential by 2030

***

## 2. Detailed Problem Analysis & Market Research

### 🔍 Current Healthcare Data Challenges

#### **Data Silos & Interoperability**
- **Problem**: 89% of health data remains in institutional silos
- **Impact**: Researchers cannot access comprehensive datasets
- **Cost**: $30B annually in duplicated research efforts

#### **Patient Data Rights**
- **Problem**: Patients have minimal control over their medical data
- **Current State**: Data monetized by institutions without patient benefit
- **Regulatory Gap**: HIPAA protects privacy but doesn't grant ownership rights

#### **Research Funding Bottlenecks**
- **Traditional Model**: Centralized grant systems favor established institutions
- **Success Rate**: Only 18% of NIH grant applications receive funding
- **Innovation Gap**: Rare disease research severely underfunded

#### **Clinical Trial Inefficiencies**
- **Patient Recruitment**: Takes 6-12 months, costs $1M+ per trial
- **Geographic Limitations**: 70% of patients live >1 hour from trial sites
- **Transparency Issues**: 50% of trial results never published

### 📈 Market Validation Through Successful Projects

**Successful DeSci Examples:**
- **VitaDAO**: $4.1M raised for longevity research through decentralized funding
- **ResearchHub**: 50K+ researchers sharing and funding studies
- **LabDAO**: Distributed biotechnology research network

**Healthcare Blockchain Adoption:**
- **MedRec**: MIT's blockchain EHR system
- **Guardtime**: Estonian national health blockchain
- **BurstIQ**: HIPAA-compliant blockchain data platform

***

## 3. Comprehensive Solution Architecture

### 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DECLINET ECOSYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│  USER INTERFACES                                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │   Patient   │ │ Researcher  │ │   Funder    │              │
│  │    dApp     │ │   Portal    │ │    DAO      │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
├─────────────────────────────────────────────────────────────────┤
│  APPLICATION LAYER                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │  Consent    │ │   AI/ML     │ │ Governance  │              │
│  │ Management  │ │  Analytics  │ │   System    │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
├─────────────────────────────────────────────────────────────────┤
│  BLOCKCHAIN LAYER (BNB SMART CHAIN)                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │    Data     │ │   Token     │ │    DAO      │              │
│  │  Registry   │ │  Economy    │ │ Governance  │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
├─────────────────────────────────────────────────────────────────┤
│  DATA LAYER                                                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Encrypted   │ │    BNB      │ │   IoT/      │              │
│  │ Health Data │ │ Greenfield  │ │ Wearables   │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### 🔧 Core System Components

#### **1. Data Registry Layer**
- **Health Data Schemas**: Standardized formats for EHR, genomics, wearables
- **Metadata Management**: Data cataloging, versioning, and lineage tracking
- **Access Control Lists**: Granular permissions for data usage
- **Integrity Verification**: Cryptographic hashes for tamper detection

#### **2. Identity & Consent System**
- **Self-Sovereign Identity**: Patients control their digital health identity
- **Dynamic Consent**: Granular, revocable permissions for different research uses
- **Researcher Verification**: KYC/AML for institutional researchers
- **Audit Trail**: Immutable record of all data access and usage

#### **3. AI/ML Processing Engine**
- **Federated Learning**: Train models without centralizing data
- **Privacy-Preserving Analytics**: Differential privacy and secure multi-party computation
- **Model Marketplace**: Researchers can deploy and monetize AI models
- **Result Verification**: Cryptographic proofs of model outputs

#### **4. Tokenomics & Incentive System**
- **DCNET Token**: BEP-20 utility token for data rewards and governance
- **Reputation Scoring**: Dynamic reputation based on data quality and contribution
- **Staking Mechanisms**: Long-term commitment incentives
- **Automated Rewards**: Smart contract-based token distribution

***

## 4. Technical Stack & Infrastructure

### 🛠️ Primary Technology Choices

#### **Blockchain Infrastructure**
```
Primary Chain: BNB Smart Chain (Solidity)
├── Rationale: 
│   ├── Low transaction fees (~$0.01)
│   ├── Fast block times (3 seconds)
│   ├── Ethereum-compatible tooling
│   └── Strong DeFi ecosystem
├── Layer 2: opBNB for micro-transactions
├── Storage: BNB Greenfield for large datasets
└── Cross-chain: LayerZero for multichain support
```

#### **Frontend Technology Stack**
```
Web Application: Next.js 14 + TypeScript
├── UI Framework: Tailwind CSS + shadcn/ui
├── State Management: Zustand + React Query
├── Wallet Integration: wagmi + ConnectKit
├── Charts/Analytics: Recharts + D3.js
└── Testing: Jest + React Testing Library

Mobile Application: React Native + Expo
├── Navigation: React Navigation v6
├── State: Redux Toolkit + RTK Query
├── UI: NativeBase + React Native Elements
└── Push Notifications: Expo Notifications
```

#### **Backend Services**
```
API Layer: Node.js + Express.js + TypeScript
├── Database: PostgreSQL + Redis (caching)
├── File Storage: BNB Greenfield + IPFS
├── Authentication: JWT + Passport.js
├── Queue System: Bull + Redis
└── Monitoring: Winston + DataDog

AI/ML Pipeline: Python + FastAPI
├── ML Framework: PyTorch + Scikit-learn
├── Privacy: PySyft (Federated Learning)
├── Data Processing: Pandas + NumPy
├── Model Serving: TorchServe + ONNX
└── Experiment Tracking: MLflow + Weights & Biases
```

#### **DevOps & Infrastructure**
```
Cloud Provider: AWS / Google Cloud Platform
├── Container: Docker + Kubernetes
├── CI/CD: GitHub Actions + ArgoCD
├── Monitoring: Prometheus + Grafana
├── Security: HashiCorp Vault + AWS KMS
└── CDN: CloudFlare for global distribution
```

***

## 5. Smart Contract System Design

### 📝 Solidity Smart Contract Architecture

#### **Core Contract Implementation**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title PatientDataRegistry
 * @dev Manages patient health data with privacy controls and consent management
 */
contract PatientDataRegistry is Ownable, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;
    
    struct DataRecord {
        address patientAddress;
        string dataHash;
        string metadataURI;
        bytes consentPermissions;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 accessCount;
        uint256 rewardEarned;
        bool isActive;
    }
    
    struct ConsentSettings {
        bool allowResearch;
        bool allowCommercial;
        bool allowSharing;
        uint256 retentionPeriod;
        string[] allowedPurposes;
    }
    
    // Storage
    Counters.Counter private _dataIdCounter;
    mapping(uint256 => DataRecord) public dataRecords;
    mapping(address => uint256[]) public patientRecords;
    mapping(address => ConsentSettings) public patientConsent;
    mapping(string => bool) public usedDataHashes;
    
    // Statistics
    uint256 public totalRecords;
    uint256 public totalPatients;
    uint256 public totalRewardsDistributed;
    
    // Events
    event DataSubmitted(
        uint256 indexed dataId,
        address indexed patient,
        string dataHash,
        uint256 timestamp
    );
    
    event ConsentUpdated(
        address indexed patient,
        uint256 timestamp
    );
    
    event DataAccessed(
        uint256 indexed dataId,
        address indexed accessor,
        string purpose,
        uint256 timestamp
    );
    
    event RewardDistributed(
        address indexed patient,
        uint256 amount,
        string reason
    );
    
    modifier onlyPatientOrAuthorized(uint256 dataId) {
        require(
            dataRecords[dataId].patientAddress == msg.sender || 
            hasAccessPermission(msg.sender, dataId),
            "Unauthorized access"
        );
        _;
    }
    
    modifier validDataId(uint256 dataId) {
        require(dataId > 0 && dataId <= _dataIdCounter.current(), "Invalid data ID");
        _;
    }
    
    constructor() {}
    
    /**
     * @dev Submit new patient health data
     */
    function submitPatientData(
        string calldata dataHash,
        string calldata metadataURI,
        bytes calldata consentPermissions
    ) external whenNotPaused nonReentrant returns (uint256) {
        require(bytes(dataHash).length > 0, "Data hash cannot be empty");
        require(!usedDataHashes[dataHash], "Data hash already exists");
        
        _dataIdCounter.increment();
        uint256 newDataId = _dataIdCounter.current();
        
        DataRecord storage record = dataRecords[newDataId];
        record.patientAddress = msg.sender;
        record.dataHash = dataHash;
        record.metadataURI = metadataURI;
        record.consentPermissions = consentPermissions;
        record.createdAt = block.timestamp;
        record.updatedAt = block.timestamp;
        record.accessCount = 0;
        record.rewardEarned = 0;
        record.isActive = true;
        
        // Update patient records
        if (patientRecords[msg.sender].length == 0) {
            totalPatients++;
        }
        patientRecords[msg.sender].push(newDataId);
        
        // Mark hash as used
        usedDataHashes[dataHash] = true;
        totalRecords++;
        
        emit DataSubmitted(newDataId, msg.sender, dataHash, block.timestamp);
        
        return newDataId;
    }
    
    /**
     * @dev Update consent permissions for existing data
     */
    function updateConsent(
        uint256 dataId,
        bytes calldata newConsentPermissions
    ) external validDataId(dataId) {
        require(dataRecords[dataId].patientAddress == msg.sender, "Only patient can update consent");
        
        dataRecords[dataId].consentPermissions = newConsentPermissions;
        dataRecords[dataId].updatedAt = block.timestamp;
        
        emit ConsentUpdated(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Set global consent settings for a patient
     */
    function setConsentSettings(
        bool allowResearch,
        bool allowCommercial,
        bool allowSharing,
        uint256 retentionPeriod,
        string[] calldata allowedPurposes
    ) external {
        ConsentSettings storage consent = patientConsent[msg.sender];
        consent.allowResearch = allowResearch;
        consent.allowCommercial = allowCommercial;
        consent.allowSharing = allowSharing;
        consent.retentionPeriod = retentionPeriod;
        consent.allowedPurposes = allowedPurposes;
        
        emit ConsentUpdated(msg.sender, block.timestamp);
    }
    
    /**
     * @dev Record data access for audit trail
     */
    function recordDataAccess(
        uint256 dataId,
        string calldata purpose
    ) external validDataId(dataId) onlyPatientOrAuthorized(dataId) {
        DataRecord storage record = dataRecords[dataId];
        record.accessCount++;
        record.updatedAt = block.timestamp;
        
        emit DataAccessed(dataId, msg.sender, purpose, block.timestamp);
    }
    
    /**
     * @dev Distribute rewards to data contributors
     */
    function distributeReward(
        address patient,
        uint256 amount,
        string calldata reason
    ) external onlyOwner {
        require(patient != address(0), "Invalid patient address");
        require(amount > 0, "Amount must be greater than 0");
        
        // Update patient's total rewards across all their data records
        uint256[] memory patientDataIds = patientRecords[patient];
        for (uint256 i = 0; i < patientDataIds.length; i++) {
            dataRecords[patientDataIds[i]].rewardEarned += amount / patientDataIds.length;
        }
        
        totalRewardsDistributed += amount;
        
        emit RewardDistributed(patient, amount, reason);
    }
    
    /**
     * @dev Get patient's data records
     */
    function getPatientRecords(address patient) external view returns (uint256[] memory) {
        return patientRecords[patient];
    }
    
    /**
     * @dev Get data record details
     */
    function getDataRecord(uint256 dataId) external view validDataId(dataId) 
        returns (
            address patientAddress,
            string memory dataHash,
            string memory metadataURI,
            uint256 createdAt,
            uint256 accessCount,
            uint256 rewardEarned,
            bool isActive
        ) {
        DataRecord storage record = dataRecords[dataId];
        return (
            record.patientAddress,
            record.dataHash,
            record.metadataURI,
            record.createdAt,
            record.accessCount,
            record.rewardEarned,
            record.isActive
        );
    }
    
    /**
     * @dev Check if address has access permission to data
     */
    function hasAccessPermission(address accessor, uint256 dataId) public view returns (bool) {
        // Implement your access control logic here
        // This could involve checking researcher verification, consent permissions, etc.
        return false; // Placeholder implementation
    }
    
    /**
     * @dev Emergency pause functionality
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Get contract statistics
     */
    function getStatistics() external view returns (
        uint256 _totalRecords,
        uint256 _totalPatients,
        uint256 _totalRewardsDistributed
    ) {
        return (totalRecords, totalPatients, totalRewardsDistributed);
    }
}
```

#### **Research DAO Contract**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ResearchDAO
 * @dev Decentralized governance for research funding and community decisions
 */
contract ResearchDAO is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    IERC20 public dcnetToken;
    
    enum ProposalStatus { Active, Approved, Rejected, Completed, Cancelled }
    
    struct ResearchProposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string metadataURI;
        uint256 fundingRequested;
        uint256 votingDeadline;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) voteWeight;
        ProposalStatus status;
        uint256 createdAt;
    }
    
    struct Voter {
        uint256 tokenBalance;
        uint256 votingPower;
        uint256 reputation;
        bool isVerified;
    }
    
    // Storage
    Counters.Counter private _proposalIdCounter;
    mapping(uint256 => ResearchProposal) public proposals;
    mapping(address => Voter) public voters;
    mapping(address => uint256[]) public userProposals;
    
    // DAO Parameters
    uint256 public proposalThreshold = 1000 * 10**18; // 1000 DCNET tokens
    uint256 public votingPeriod = 7 days;
    uint256 public quorumPercentage = 10; // 10% of total supply
    uint256 public approvalThreshold = 51; // 51% approval needed
    uint256 public totalTreasuryFunds;
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 fundingRequested,
        uint256 votingDeadline
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight,
        uint256 timestamp
    );
    
    event ProposalExecuted(
        uint256 indexed proposalId,
        ProposalStatus status,
        uint256 timestamp
    );
    
    event FundsDeposited(
        address indexed depositor,
        uint256 amount,
        uint256 timestamp
    );
    
    modifier onlyVerifiedVoter() {
        require(voters[msg.sender].isVerified, "Voter not verified");
        _;
    }
    
    modifier validProposalId(uint256 proposalId) {
        require(proposalId > 0 && proposalId <= _proposalIdCounter.current(), "Invalid proposal ID");
        _;
    }
    
    constructor(address _dcnetToken) {
        dcnetToken = IERC20(_dcnetToken);
    }
    
    /**
     * @dev Submit new research proposal
     */
    function submitProposal(
        string calldata title,
        string calldata description,
        string calldata metadataURI,
        uint256 fundingRequested
    ) external onlyVerifiedVoter returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(fundingRequested > 0, "Funding must be greater than 0");
        require(
            dcnetToken.balanceOf(msg.sender) >= proposalThreshold,
            "Insufficient tokens to create proposal"
        );
        
        _proposalIdCounter.increment();
        uint256 newProposalId = _proposalIdCounter.current();
        
        ResearchProposal storage proposal = proposals[newProposalId];
        proposal.id = newProposalId;
        proposal.proposer = msg.sender;
        proposal.title = title;
        proposal.description = description;
        proposal.metadataURI = metadataURI;
        proposal.fundingRequested = fundingRequested;
        proposal.votingDeadline = block.timestamp + votingPeriod;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.status = ProposalStatus.Active;
        proposal.createdAt = block.timestamp;
        
        userProposals[msg.sender].push(newProposalId);
        
        emit ProposalCreated(
            newProposalId,
            msg.sender,
            title,
            fundingRequested,
            proposal.votingDeadline
        );
        
        return newProposalId;
    }
    
    /**
     * @dev Vote on research proposal with quadratic voting
     */
    function vote(
        uint256 proposalId,
        bool support,
        uint256 tokenAmount
    ) external validProposalId(proposalId) onlyVerifiedVoter nonReentrant {
        ResearchProposal storage proposal = proposals[proposalId];
        
        require(block.timestamp <= proposal.votingDeadline, "Voting period ended");
        require(proposal.status == ProposalStatus.Active, "Proposal not active");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(
            dcnetToken.balanceOf(msg.sender) >= tokenAmount,
            "Insufficient token balance"
        );
        
        // Lock tokens for voting (implement token locking mechanism)
        require(
            dcnetToken.transferFrom(msg.sender, address(this), tokenAmount),
            "Token transfer failed"
        );
        
        // Calculate quadratic voting weight
        uint256 voteWeight = sqrt(tokenAmount);
        
        if (support) {
            proposal.votesFor += voteWeight;
        } else {
            proposal.votesAgainst += voteWeight;
        }
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteWeight[msg.sender] = voteWeight;
        
        // Update voter reputation
        voters[msg.sender].reputation += 1;
        
        emit VoteCast(proposalId, msg.sender, support, voteWeight, block.timestamp);
    }
    
    /**
     * @dev Execute proposal after voting period
     */
    function executeProposal(uint256 proposalId) external validProposalId(proposalId) {
        ResearchProposal storage proposal = proposals[proposalId];
        
        require(block.timestamp > proposal.votingDeadline, "Voting period not ended");
        require(proposal.status == ProposalStatus.Active, "Proposal not active");
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 totalSupply = dcnetToken.totalSupply();
        uint256 quorum = (totalSupply * quorumPercentage) / 100;
        
        if (totalVotes < quorum) {
            proposal.status = ProposalStatus.Rejected;
        } else {
            uint256 approvalRate = (proposal.votesFor * 100) / totalVotes;
            if (approvalRate >= approvalThreshold) {
                proposal.status = ProposalStatus.Approved;
                // Transfer funds to proposer (implement treasury management)
                if (proposal.fundingRequested <= totalTreasuryFunds) {
                    totalTreasuryFunds -= proposal.fundingRequested;
                    // Implement fund transfer logic
                }
            } else {
                proposal.status = ProposalStatus.Rejected;
            }
        }
        
        emit ProposalExecuted(proposalId, proposal.status, block.timestamp);
    }
    
    /**
     * @dev Deposit funds to DAO treasury
     */
    function depositTreasuryFunds(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            dcnetToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        totalTreasuryFunds += amount;
        
        emit FundsDeposited(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Verify voter (only owner can verify)
     */
    function verifyVoter(address voter, bool isVerified) external onlyOwner {
        voters[voter].isVerified = isVerified;
        if (isVerified) {
            voters[voter].tokenBalance = dcnetToken.balanceOf(voter);
            voters[voter].votingPower = calculateVotingPower(voter);
        }
    }
    
    /**
     * @dev Calculate voting power based on tokens and reputation
     */
    function calculateVotingPower(address voter) public view returns (uint256) {
        Voter memory voterInfo = voters[voter];
        uint256 tokenPower = voterInfo.tokenBalance;
        uint256 reputationBonus = (tokenPower * voterInfo.reputation) / 100;
        return tokenPower + reputationBonus;
    }
    
    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) external view validProposalId(proposalId)
        returns (
            address proposer,
            string memory title,
            string memory description,
            uint256 fundingRequested,
            uint256 votingDeadline,
            uint256 votesFor,
            uint256 votesAgainst,
            ProposalStatus status,
            uint256 createdAt
        ) {
        ResearchProposal storage proposal = proposals[proposalId];
        return (
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.fundingRequested,
            proposal.votingDeadline,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.status,
            proposal.createdAt
        );
    }
    
    /**
     * @dev Square root function for quadratic voting
     */
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 xx = x;
        uint256 r = 1;
        if (xx >= 0x100000000000000000000000000000000) { xx >>= 128; r <<= 64; }
        if (xx >= 0x10000000000000000) { xx >>= 64; r <<= 32; }
        if (xx >= 0x100000000) { xx >>= 32; r <<= 16; }
        if (xx >= 0x10000) { xx >>= 16; r <<= 8; }
        if (xx >= 0x100) { xx >>= 8; r <<= 4; }
        if (xx >= 0x10) { xx >>= 4; r <<= 2; }
        if (xx >= 0x8) { r <<= 1; }
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        r = (r + x / r) >> 1;
        uint256 r1 = x / r;
        return r < r1 ? r : r1;
    }
    
    /**
     * @dev Update DAO parameters (only owner)
     */
    function updateDAOParameters(
        uint256 _proposalThreshold,
        uint256 _votingPeriod,
        uint256 _quorumPercentage,
        uint256 _approvalThreshold
    ) external onlyOwner {
        proposalThreshold = _proposalThreshold;
        votingPeriod = _votingPeriod;
        quorumPercentage = _quorumPercentage;
        approvalThreshold = _approvalThreshold;
    }
    
    /**
     * @dev Get DAO statistics
     */
    function getDAOStatistics() external view returns (
        uint256 totalProposals,
        uint256 activeProposals,
        uint256 _totalTreasuryFunds,
        uint256 totalVerifiedVoters
    ) {
        uint256 active = 0;
        uint256 verified = 0;
        
        for (uint256 i = 1; i <= _proposalIdCounter.current(); i++) {
            if (proposals[i].status == ProposalStatus.Active) {
                active++;
            }
        }
        
        // Note: This is inefficient for large numbers of voters
        // In production, maintain separate counters
        
        return (_proposalIdCounter.current(), active, totalTreasuryFunds, verified);
    }
}
```

#### **DCNET Token Contract**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title DCNETToken
 * @dev DeCliNet utility token with reward distribution and staking capabilities
 */
contract DCNETToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {
    
    // Token allocation percentages
    uint256 public constant DATA_REWARDS_POOL = 400_000_000 * 10**18; // 40%
    uint256 public constant RESEARCH_FUNDING_POOL = 300_000_000 * 10**18; // 30%
    uint256 public constant GOVERNANCE_POOL = 150_000_000 * 10**18; // 15%
    uint256 public constant TEAM_POOL = 100_000_000 * 10**18; // 10%
    uint256 public constant ECOSYSTEM_POOL = 50_000_000 * 10**18; // 5%
    
    // Vesting and distribution tracking
    mapping(address => uint256) public dataRewardsEarned;
    mapping(address => uint256) public stakingRewards;
    mapping(address => StakingInfo) public stakingInfo;
    
    struct StakingInfo {
        uint256 stakedAmount;
        uint256 stakeTimestamp;
        uint256 lockPeriod;
        uint256 rewardsEarned;
        bool isActive;
    }
    
    // Pool tracking
    uint256 public dataRewardsDistributed;
    uint256 public researchFundingDistributed;
    uint256 public governanceDistributed;
    uint256 public totalStaked;
    
    // Staking parameters
    uint256 public baseStakingRate = 12; // 12% APY
    uint256 public maxStakingBonus = 100; // 100% bonus for long-term staking
    
    // Events
    event DataRewardDistributed(address indexed recipient, uint256 amount, string reason);
    event TokensStaked(address indexed staker, uint256 amount, uint256 lockPeriod);
    event TokensUnstaked(address indexed staker, uint256 amount, uint256 rewards);
    event StakingRewardClaimed(address indexed staker, uint256 amount);
    
    modifier onlyAuthorizedRewarder() {
        // In production, implement proper role-based access control
        require(msg.sender == owner(), "Not authorized to distribute rewards");
        _;
    }
    
    constructor() ERC20("DeCliNet Token", "DCNET") {
        // Mint initial supply to contract owner for controlled distribution
        _mint(msg.sender, 1_000_000_000 * 10**18); // 1 billion tokens
    }
    
    /**
     * @dev Distribute rewards for data contribution
     */
    function distributeDataReward(
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyAuthorizedRewarder {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(
            dataRewardsDistributed + amount <= DATA_REWARDS_POOL,
            "Exceeds data rewards pool"
        );
        
        dataRewardsEarned[recipient] += amount;
        dataRewardsDistributed += amount;
        
        _transfer(msg.sender, recipient, amount);
        
        emit DataRewardDistributed(recipient, amount, reason);
    }
    
    /**
     * @dev Stake tokens for rewards
     */
    function stakeTokens(uint256 amount, uint256 lockPeriodMonths) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(lockPeriodMonths >= 1 && lockPeriodMonths <= 60, "Invalid lock period");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        StakingInfo storage userStake = stakingInfo[msg.sender];
        
        if (userStake.isActive) {
            // If already staking, claim existing rewards first
            _claimStakingRewards(msg.sender);
            userStake.stakedAmount += amount;
        } else {
            userStake.stakedAmount = amount;
            userStake.isActive = true;
        }
        
        userStake.stakeTimestamp = block.timestamp;
        userStake.lockPeriod = lockPeriodMonths * 30 days; // Approximate months in seconds
        
        totalStaked += amount;
        
        emit TokensStaked(msg.sender, amount, lockPeriodMonths);
    }
    
    /**
     * @dev Unstake tokens and claim rewards
     */
    function unstakeTokens() external nonReentrant {
        StakingInfo storage userStake = stakingInfo[msg.sender];
        
        require(userStake.isActive, "No active stake");
        require(
            block.timestamp >= userStake.stakeTimestamp + userStake.lockPeriod,
            "Lock period not expired"
        );
        
        uint256 stakedAmount = userStake.stakedAmount;
        uint256 rewards = calculateStakingRewards(msg.sender);
        
        // Reset staking info
        userStake.stakedAmount = 0;
        userStake.isActive = false;
        userStake.rewardsEarned += rewards;
        
        totalStaked -= stakedAmount;
        
        // Transfer staked tokens back to user
        _transfer(address(this), msg.sender, stakedAmount);
        
        // Mint and distribute rewards (if any)
        if (rewards > 0) {
            _mint(msg.sender, rewards);
            stakingRewards[msg.sender] += rewards;
        }
        
        emit TokensUnstaked(msg.sender, stakedAmount, rewards);
    }
    
    /**
     * @dev Claim staking rewards without unstaking
     */
    function claimStakingRewards() external nonReentrant {
        _claimStakingRewards(msg.sender);
    }
    
    function _claimStakingRewards(address staker) internal {
        StakingInfo storage userStake = stakingInfo[staker];
        require(userStake.isActive, "No active stake");
        
        uint256 rewards = calculateStakingRewards(staker);
        
        if (rewards > 0) {
            userStake.stakeTimestamp = block.timestamp; // Reset reward calculation timestamp
            userStake.rewardsEarned += rewards;
            
            _mint(staker, rewards);
            stakingRewards[staker] += rewards;
            
            emit StakingRewardClaimed(staker, rewards);
        }
    }
    
    /**
     * @dev Calculate staking rewards for a user
     */
    function calculateStakingRewards(address staker) public view returns (uint256) {
        StakingInfo memory userStake = stakingInfo[staker];
        
        if (!userStake.isActive || userStake.stakedAmount == 0) {
            return 0;
        }
        
        uint256 stakingDuration = block.timestamp - userStake.stakeTimestamp;
        uint256 annualReward = (userStake.stakedAmount * baseStakingRate) / 100;
        
        // Calculate time-based reward
        uint256 timeReward = (annualReward * stakingDuration) / 365 days;
        
        // Calculate lock period bonus
        uint256 lockBonusPercentage = (userStake.lockPeriod / 30 days) * 2; // 2% per month
        lockBonusPercentage = lockBonusPercentage > maxStakingBonus ? maxStakingBonus : lockBonusPercentage;
        
        uint256 bonusReward = (timeReward * lockBonusPercentage) / 100;
        
        return timeReward + bonusReward;
    }
    
    /**
     * @dev Get user staking information
     */
    function getStakingInfo(address staker) external view returns (
        uint256 stakedAmount,
        uint256 stakeTimestamp,
        uint256 lockPeriod,
        uint256 rewardsEarned,
        uint256 pendingRewards,
        bool isActive
    ) {
        StakingInfo memory userStake = stakingInfo[staker];
        uint256 pending = calculateStakingRewards(staker);
        
        return (
            userStake.stakedAmount,
            userStake.stakeTimestamp,
            userStake.lockPeriod,
            userStake.rewardsEarned,
            pending,
            userStake.isActive
        );
    }
    
    /**
     * @dev Batch reward distribution for efficiency
     */
    function batchDistributeRewards(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string calldata reason
    ) external onlyAuthorizedRewarder {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(
            dataRewardsDistributed + totalAmount <= DATA_REWARDS_POOL,
            "Exceeds data rewards pool"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient");
            require(amounts[i] > 0, "Amount must be greater than 0");
            
            dataRewardsEarned[recipients[i]] += amounts[i];
            _transfer(msg.sender, recipients[i], amounts[i]);
            
            emit DataRewardDistributed(recipients[i], amounts[i], reason);
        }
        
        dataRewardsDistributed += totalAmount;
    }
    
    /**
     * @dev Get token distribution statistics
     */
    function getDistributionStats() external view returns (
        uint256 _dataRewardsDistributed,
        uint256 _researchFundingDistributed,
        uint256 _governanceDistributed,
        uint256 _totalStaked,
        uint256 dataRewardsRemaining,
        uint256 researchFundingRemaining
    ) {
        return (
            dataRewardsDistributed,
            researchFundingDistributed,
            governanceDistributed,
            totalStaked,
            DATA_REWARDS_POOL - dataRewardsDistributed,
            RESEARCH_FUNDING_POOL - researchFundingDistributed
        );
    }
    
    // Override required by Solidity for multiple inheritance
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Emergency pause functionality
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}
```

***

## 6. Database Architecture & Data Management

### 🗄️ Data Architecture Strategy

#### **Hybrid Storage Approach**

```sql
-- PostgreSQL Schema for Metadata and Fast Queries

-- Users and Identity Management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('patient', 'researcher', 'institution')),
    email VARCHAR(255),
    kyc_status VARCHAR(20) DEFAULT 'pending',
    reputation_score INTEGER DEFAULT 0,
    bsc_address VARCHAR(42), -- BNB Smart Chain address
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health Data Registry (Metadata Only)
CREATE TABLE health_data_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id),
    blockchain_data_id BIGINT NOT NULL, -- Contract data ID
    data_hash VARCHAR(64) NOT NULL,
    greenfield_hash VARCHAR(64), -- BNB Greenfield hash
    ipfs_hash VARCHAR(46), -- Backup IPFS storage
    data_type VARCHAR(50) NOT NULL,
    data_size BIGINT NOT NULL,
    quality_score INTEGER DEFAULT 0,
    consent_hash VARCHAR(64) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    transaction_hash VARCHAR(66),
    block_number BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP,
    access_count INTEGER DEFAULT 0
);

-- Consent Management
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id),
    data_record_id UUID REFERENCES health_data_records(id),
    consent_type VARCHAR(50) NOT NULL,
    permissions JSONB NOT NULL,
    allow_research BOOLEAN DEFAULT true,
    allow_commercial BOOLEAN DEFAULT false,
    allow_sharing BOOLEAN DEFAULT true,
    retention_period INTEGER, -- in months
    expiry_date TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    blockchain_hash VARCHAR(66), -- Transaction hash of consent update
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research Projects
CREATE TABLE research_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    researcher_id UUID REFERENCES users(id),
    dao_proposal_id BIGINT, -- DAO contract proposal ID
    title VARCHAR(255) NOT NULL,
    description TEXT,
    research_area VARCHAR(100),
    funding_goal DECIMAL(20,8), -- DCNET tokens
    funding_raised DECIMAL(20,8) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'proposed',
    contract_address VARCHAR(42),
    voting_deadline TIMESTAMP,
    votes_for BIGINT DEFAULT 0,
    votes_against BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Model Registry
CREATE TABLE ai_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES users(id),
    model_name VARCHAR(255) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    description TEXT,
    greenfield_hash VARCHAR(64) NOT NULL, -- Model stored on BNB Greenfield
    performance_metrics JSONB,
    is_federated BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    price_per_use DECIMAL(20,8), -- DCNET tokens
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Access Logs (Audit Trail)
CREATE TABLE data_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_record_id UUID REFERENCES health_data_records(id),
    accessor_id UUID REFERENCES users(id),
    access_type VARCHAR(50) NOT NULL,
    access_purpose TEXT,
    blockchain_tx_hash VARCHAR(66),
    gas_used BIGINT,
    access_fee DECIMAL(20,8), -- DCNET tokens paid
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Token Transactions
CREATE TABLE token_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    token_contract VARCHAR(42) DEFAULT '0x...', -- DCNET contract address
    blockchain_tx_hash VARCHAR(66) NOT NULL,
    block_number BIGINT,
    gas_price DECIMAL(20,8),
    gas_used BIGINT,
    status VARCHAR(20) DEFAULT 'pending',
    related_activity_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staking Information
CREATE TABLE staking_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    staked_amount DECIMAL(20,8) NOT NULL,
    stake_timestamp TIMESTAMP NOT NULL,
    lock_period_months INTEGER NOT NULL,
    rewards_earned DECIMAL(20,8) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    stake_tx_hash VARCHAR(66),
    unstake_tx_hash VARCHAR(66),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DAO Voting Records
CREATE TABLE dao_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id BIGINT NOT NULL,
    voter_id UUID REFERENCES users(id),
    vote_support BOOLEAN NOT NULL,
    vote_weight DECIMAL(20,8) NOT NULL,
    tokens_used DECIMAL(20,8) NOT NULL,
    transaction_hash VARCHAR(66),
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blockchain sync status
CREATE TABLE sync_status (
    id SERIAL PRIMARY KEY,
    contract_name VARCHAR(100) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    last_synced_block BIGINT DEFAULT 0,
    last_sync_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sync_status VARCHAR(20) DEFAULT 'active'
);

-- Indexes for Performance
CREATE INDEX idx_health_data_patient ON health_data_records(patient_id);
CREATE INDEX idx_health_data_type ON health_data_records(data_type);
CREATE INDEX idx_health_data_blockchain_id ON health_data_records(blockchain_data_id);
CREATE INDEX idx_consent_patient ON consent_records(patient_id);
CREATE INDEX idx_consent_active ON consent_records(is_active);
CREATE INDEX idx_access_logs_data ON data_access_logs(data_record_id);
CREATE INDEX idx_access_logs_time ON data_access_logs(accessed_at);
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_bsc_address ON users(bsc_address);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_token_tx_hash ON token_transactions(blockchain_tx_hash);
CREATE INDEX idx_token_tx_user ON token_transactions(user_id);
CREATE INDEX idx_staking_user ON staking_records(user_id);
CREATE INDEX idx_staking_active ON staking_records(is_active);
CREATE INDEX idx_dao_votes_proposal ON dao_votes(proposal_id);
CREATE INDEX idx_dao_votes_voter ON dao_votes(voter_id);
```

#### **BNB Greenfield Data Structure**

```json
{
  "healthDataSchema": {
    "patient": {
      "patientId": "encrypted_patient_identifier",
      "demographics": {
        "ageGroup": "25-35",
        "gender": "M/F/Other/Prefer_not_to_say",
        "locationRegion": "hashed_region_code",
        "ethnicity": "optional_ethnicity_code"
      },
      "medicalHistory": {
        "conditions": [
          {
            "conditionId": "ICD10_code",
            "diagnosisDate": "YYYY-MM",
            "severity": "mild|moderate|severe",
            "status": "active|resolved|chronic"
          }
        ],
        "medications": [
          {
            "medicationId": "drug_code",
            "dosage": "standardized_dosage",
            "startDate": "YYYY-MM",
            "endDate": "YYYY-MM",
            "indication": "reason_code"
          }
        ],
        "allergies": [
          {
            "allergen": "substance_code",
            "reactionType": "reaction_description",
            "severity": "mild|moderate|severe"
          }
        ],
        "surgeries": [
          {
            "procedureCode": "CPT_code",
            "date": "YYYY-MM-DD",
            "outcome": "success|complication|pending"
          }
        ]
      },
      "vitalSigns": {
        "recordingPeriod": {
          "startDate": "2025-08-01T00:00:00Z",
          "endDate": "2025-08-22T23:59:59Z"
        },
        "measurements": [
          {
            "timestamp": "2025-08-22T13:54:00Z",
            "heartRate": 72,
            "bloodPressureSystolic": 120,
            "bloodPressureDiastolic": 80,
            "temperature": 98.6,
            "oxygenSaturation": 98,
            "respiratoryRate": 16,
            "weight": 70.5,
            "height": 175
          }
        ]
      },
      "labResults": [
        {
          "testDate": "2025-08-20",
          "labOrderId": "encrypted_order_id",
          "results": {
            "glucose": {
              "value": 95,
              "unit": "mg/dL",
              "referenceRange": "70-100",
              "status": "normal"
            },
            "cholesterolTotal": {
              "value": 180,
              "unit": "mg/dL",
              "referenceRange": "<200",
              "status": "normal"
            },
            "hemoglobin": {
              "value": 14.5,
              "unit": "g/dL",
              "referenceRange": "12-16",
              "status": "normal"
            }
          }
        }
      ],
      "wearableData": {
        "devices": [
          {
            "deviceType": "smartwatch",
            "manufacturer": "apple_watch_series_9",
            "dataRange": "2025-08-01_to_2025-08-22",
            "samplingFrequency": "1_minute"
          }
        ],
        "aggregatedMetrics": {
          "dailyAverages": {
            "steps": 8500,
            "sleepDuration": 7.5,
            "heartRate": 70,
            "activeMinutes": 45,
            "caloriesBurned": 2200
          },
          "trends": {
            "stepsTrend": "increasing",
            "sleepQualityTrend": "stable",
            "heartRateVariability": "normal"
          }
        }
      },
      "genomicData": {
        "available": true,
        "sequencingType": "whole_genome|exome|targeted_panel",
        "variants": [
          {
            "geneSymbol": "BRCA1",
            "variantId": "rs_number",
            "clinicalSignificance": "benign|pathogenic|uncertain",
            "alleleFrequency": 0.001
          }
        ],
        "polygeneticRiskScores": {
          "cardiovascularDisease": 0.65,
          "type2Diabetes": 0.32,
          "alzheimerDisease": 0.18
        }
      }
    },
    "dataQuality": {
      "completeness": 0.95,
      "accuracy": 0.98,
      "timeliness": 0.90,
      "consistency": 0.93,
      "validationTimestamp": "2025-08-22T13:54:00Z",
      "qualityScore": 94
    },
    "privacy": {
      "encryptionMethod": "AES-256-GCM",
      "anonymizationLevel": "k-anonymity-5",
      "differentialPrivacy": {
        "applied": true,
        "epsilonValue": 1.0
      },
      "dataMinimization": true,
      "consentVersion": "v2.1",
      "retentionPolicy": "5_years"
    },
    "blockchain": {
      "networkId": 56, // BSC Mainnet
      "contractAddress": "0x...",
      "dataId": 12345,
      "transactionHash": "0x...",
      "blockNumber": 31234567,
      "greenfieldBucket": "declinet-health-data",
      "greenfieldObjectId": "patient_12345_data_2025"
    },
    "metadata": {
      "version": "1.2.0",
      "createdAt": "2025-08-22T13:54:00Z",
      "updatedAt": "2025-08-22T13:54:00Z",
      "dataSize": 2048576, // bytes
      "checksum": "sha256_hash",
      "contributor": {
        "walletAddress": "0x...",
        "reputationScore": 850
      }
    }
  }
}
```

***

## 7. AI/ML Implementation Strategy

### 🤖 Federated Learning Architecture on BNB Chain

#### **Privacy-Preserving ML Pipeline**

```python
# Federated Learning Implementation for DeCliNet on BNB Chain
import torch
import torch.nn as nn
import syft as sy
from web3 import Web3
from cryptography.fernet import Fernet
import numpy as np
from typing import List, Dict, Any
import json
import requests

class DeCliNetFederatedModel:
    """
    Federated learning model for privacy-preserving medical research on BNB Chain
    """
    
    def __init__(self, model_config: Dict[str, Any], web3_provider: str, contract_address: str):
        self.model_config = model_config
        self.encryption_key = Fernet.generate_key()
        self.fernet = Fernet(self.encryption_key)
        self.global_model = self._create_model()
        
        # BNB Chain connection
        self.w3 = Web3(Web3.HTTPProvider(web3_provider))
        self.contract_address = contract_address
        self.contract_abi = self._load_contract_abi()
        self.contract = self.w3.eth.contract(address=contract_address, abi=self.contract_abi)
        
        # BNB Greenfield setup for model storage
        self.greenfield_config = {
            'endpoint': 'https://gnfd-testnet-sp1.bnbchain.org',
            'bucket_name': 'declinet-models',
            'access_key': 'your_access_key',
            'secret_key': 'your_secret_key'
        }
        
    def _create_model(self) -> nn.Module:
        """Create the neural network model based on config"""
        if self.model_config['type'] == 'medical_predictor':
            return MedicalPredictorModel(
                input_dim=self.model_config['input_dim'],
                hidden_dims=self.model_config['hidden_dims'],
                output_dim=self.model_config['output_dim']
            )
        elif self.model_config['type'] == 'risk_assessment':
            return RiskAssessmentModel(
                input_features=self.model_config['input_features']
            )
        elif self.model_config['type'] == 'drug_discovery':
            return DrugDiscoveryModel(
                molecular_features=self.model_config['molecular_features']
            )
        else:
            raise ValueError(f"Unknown model type: {self.model_config['type']}")
    
    def federated_training_round(self, 
                               client_data_sources: List[str],
                               num_rounds: int = 10,
                               local_epochs: int = 5) -> Dict[str, float]:
        """
        Perform federated learning training rounds with BNB Chain integration
        """
        training_metrics = []
        
        for round_num in range(num_rounds):
            print(f"Starting federated round {round_num + 1}/{num_rounds}")
            
            # Record training round start on blockchain
            self._record_training_round_start(round_num)
            
            # Distribute global model to clients via BNB Greenfield
            model_hash = self._upload_model_to_greenfield(self.global_model)
            
            # Train locally on each client
            client_updates = []
            client_metrics = []
            
            for i, client_source in enumerate(client_data_sources):
                print(f"Training client {i + 1}")
                
                # Download model from Greenfield
                client_model = self._download_model_from_greenfield(model_hash)
                
                # Load client data (privacy-preserving)
                client_data = self._load_client_data(client_source)
                
                # Local training
                local_metrics = self._local_training(client_model, client_data, local_epochs)
                
                # Upload model update to Greenfield
                update_hash = self._upload_model_to_greenfield(client_model, f"update_round_{round_num}_client_{i}")
                
                client_updates.append(update_hash)
                client_metrics.append(local_metrics)
                training_metrics.append(local_metrics)
                
                # Record client participation on blockchain
                self._record_client_participation(i, round_num, update_hash, local_metrics)
            
            # Aggregate updates using FedAvg
            aggregated_model = self._federated_averaging(client_updates)
            self.global_model = aggregated_model
            
            # Upload new global model to Greenfield
            global_model_hash = self._upload_model_to_greenfield(self.global_model, f"global_model_round_{round_num}")
            
            # Evaluate global model
            global_metrics = self._evaluate_global_model()
            
            # Record training round completion on blockchain
            self._record_training_round_completion(round_num, global_model_hash, global_metrics)
            
            print(f"Round {round_num + 1} - Global Accuracy: {global_metrics['accuracy']:.4f}")
        
        return {
            'final_accuracy': global_metrics['accuracy'],
            'final_loss': global_metrics['loss'],
            'training_rounds': num_rounds,
            'client_metrics': training_metrics,
            'final_model_hash': global_model_hash
        }
    
    def _local_training(self, model: nn.Module, 
                       data_loader: torch.utils.data.DataLoader, 
                       epochs: int) -> Dict[str, float]:
        """Train model locally on client data with privacy preservation"""
        model.train()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
        criterion = nn.CrossEntropyLoss()
        
        total_loss = 0.0
        correct_predictions = 0
        total_samples = 0
        
        for epoch in range(epochs):
            for batch_idx, (data, targets) in enumerate(data_loader):
                # Add differential privacy noise
                data = self._add_differential_privacy_noise(data)
                
                optimizer.zero_grad()
                outputs = model(data)
                loss = criterion(outputs, targets)
                loss.backward()
                
                # Clip gradients for privacy (prevents gradient attacks)
                torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
                
                optimizer.step()
                
                total_loss += loss.item()
                _, predicted = torch.max(outputs.data, 1)
                total_samples += targets.size(0)
                correct_predictions += (predicted == targets).sum().item()
        
        return {
            'loss': total_loss / len(data_loader),
            'accuracy': correct_predictions / total_samples,
            'samples': total_samples,
            'privacy_budget_used': 0.1  # Track privacy budget consumption
        }
    
    def _federated_averaging(self, client_update_hashes: List[str]) -> nn.Module:
        """Aggregate client model updates using FedAvg algorithm"""
        client_models = []
        
        # Download all client updates from Greenfield
        for update_hash in client_update_hashes:
            model = self._download_model_from_greenfield(update_hash)
            client_models.append(model)
        
        # Perform FedAvg aggregation
        global_dict = self.global_model.state_dict()
        
        for key in global_dict.keys():
            # Average the parameters across all clients
            global_dict[key] = torch.stack([
                client_model.state_dict()[key] for client_model in client_models
            ]).mean(dim=0)
        
        aggregated_model = self._create_model()
        aggregated_model.load_state_dict(global_dict)
        
        return aggregated_model
    
    def _add_differential_privacy_noise(self, data: torch.Tensor, 
                                      epsilon: float = 1.0) -> torch.Tensor:
        """Add Gaussian noise for differential privacy"""
        sensitivity = 1.0  # L2 sensitivity
        sigma = sensitivity / epsilon
        noise = torch.normal(0, sigma, size=data.shape)
        return data + noise
    
    def _upload_model_to_greenfield(self, model: nn.Module, model_name: str = None) -> str:
        """Upload model to BNB Greenfield and return hash"""
        if model_name is None:
            model_name = f"model_{int(torch.randint(0, 1000000, (1,)).item())}"
        
        # Serialize model
        model_bytes = torch.save(model.state_dict(), torch.BytesIO()).getvalue()
        
        # Upload to Greenfield (simplified - use actual Greenfield SDK)
        upload_data = {
            'bucket': self.greenfield_config['bucket_name'],
            'object_name': model_name,
            'data': model_bytes.hex(),
            'access_key': self.greenfield_config['access_key']
        }
        
        response = requests.post(
            f"{self.greenfield_config['endpoint']}/upload",
            json=upload_data
        )
        
        if response.status_code == 200:
            return response.json()['object_hash']
        else:
            raise Exception(f"Failed to upload model: {response.text}")
    
    def _download_model_from_greenfield(self, model_hash: str) -> nn.Module:
        """Download model from BNB Greenfield"""
        download_data = {
            'bucket': self.greenfield_config['bucket_name'],
            'object_hash': model_hash,
            'access_key': self.greenfield_config['access_key']
        }
        
        response = requests.post(
            f"{self.greenfield_config['endpoint']}/download",
            json=download_data
        )
        
        if response.status_code == 200:
            model_data = bytes.fromhex(response.json()['data'])
            model_state = torch.load(torch.BytesIO(model_data))
            
            model = self._create_model()
            model.load_state_dict(model_state)
            return model
        else:
            raise Exception(f"Failed to download model: {response.text}")
    
    def _record_training_round_start(self, round_num: int):
        """Record training round start on BNB Smart Chain"""
        try:
            # Get account and private key (in production, use secure key management)
            account = self.w3.eth.account.from_key('your_private_key')
            
            # Build transaction
            transaction = self.contract.functions.recordTrainingRoundStart(
                round_num,
                int(torch.Tensor([len(self.client_data_sources)]).item())
            ).build_transaction({
                'from': account.address,
                'gas': 100000,
                'gasPrice': self.w3.to_wei('5', 'gwei'),
                'nonce': self.w3.eth.get_transaction_count(account.address)
            })
            
            # Sign and send transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, 'your_private_key')
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            print(f"Training round {round_num} start recorded: {tx_hash.hex()}")
            
        except Exception as e:
            print(f"Failed to record training round start: {e}")
    
    def _record_client_participation(self, client_id: int, round_num: int, 
                                   update_hash: str, metrics: Dict[str, float]):
        """Record client participation on BNB Smart Chain"""
        try:
            account = self.w3.eth.account.from_key('your_private_key')
            
            transaction = self.contract.functions.recordClientParticipation(
                client_id,
                round_num,
                update_hash,
                int(metrics['accuracy'] * 10000),  # Store accuracy as integer (4 decimal places)
                int(metrics['loss'] * 10000),
                metrics['samples']
            ).build_transaction({
                'from': account.address,
                'gas': 150000,
                'gasPrice': self.w3.to_wei('5', 'gwei'),
                'nonce': self.w3.eth.get_transaction_count(account.address)
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(transaction, 'your_private_key')
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            print(f"Client {client_id} participation recorded: {tx_hash.hex()}")
            
        except Exception as e:
            print(f"Failed to record client participation: {e}")
    
    def _record_training_round_completion(self, round_num: int, 
                                        global_model_hash: str, 
                                        global_metrics: Dict[str, float]):
        """Record training round completion on BNB Smart Chain"""
        try:
            account = self.w3.eth.account.from_key('your_private_key')
            
            transaction = self.contract.functions.recordTrainingRoundCompletion(
                round_num,
                global_model_hash,
                int(global_metrics['accuracy'] * 10000),
                int(global_metrics['loss'] * 10000)
            ).build_transaction({
                'from': account.address,
                'gas': 120000,
                'gasPrice': self.w3.to_wei('5', 'gwei'),
                'nonce': self.w3.eth.get_transaction_count(account.address)
            })
            
            signed_txn = self.w3.eth.account.sign_transaction(transaction, 'your_private_key')
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            print(f"Training round {round_num} completion recorded: {tx_hash.hex()}")
            
        except Exception as e:
            print(f"Failed to record training round completion: {e}")
    
    def secure_prediction(self, encrypted_data: bytes) -> bytes:
        """Make predictions on encrypted data without decryption"""
        # Decrypt temporarily for processing (in production, use homomorphic encryption)
        decrypted_data = self.fernet.decrypt(encrypted_data)
        data_tensor = torch.from_numpy(np.frombuffer(decrypted_data, dtype=np.float32))
        
        with torch.no_grad():
            self.global_model.eval()
            prediction = self.global_model(data_tensor.unsqueeze(0))
            prediction_bytes = prediction.numpy().tobytes()
        
        # Re-encrypt result
        encrypted_result = self.fernet.encrypt(prediction_bytes)
        return encrypted_result
    
    def _load_contract_abi(self) -> List[Dict]:
        """Load smart contract ABI for blockchain interaction"""
        # In production, load from file or contract verification service
        return [
            {
                "inputs": [{"name": "round", "type": "uint256"}, {"name": "participants", "type": "uint256"}],
                "name": "recordTrainingRoundStart",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {"name": "clientId", "type": "uint256"},
                    {"name": "round", "type": "uint256"},
                    {"name": "updateHash", "type": "string"},
                    {"name": "accuracy", "type": "uint256"},
                    {"name": "loss", "type": "uint256"},
                    {"name": "samples", "type": "uint256"}
                ],
                "name": "recordClientParticipation",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {"name": "round", "type": "uint256"},
                    {"name": "modelHash", "type": "string"},
                    {"name": "accuracy", "type": "uint256"},
                    {"name": "loss", "type": "uint256"}
                ],
                "name": "recordTrainingRoundCompletion",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    
    def _evaluate_global_model(self) -> Dict[str, float]:
        """Evaluate global model performance"""
        # Placeholder implementation
        return {
            'accuracy': 0.87,
            'loss': 0.23,
            'f1_score': 0.85,
            'precision': 0.88,
            'recall': 0.82
        }
    
    def _load_client_data(self, client_source: str) -> torch.utils.data.DataLoader:
        """Load client data from source (placeholder)"""
        # In production, this would securely connect to hospital/clinic data sources
        num_samples = 1000
        num_features = self.model_config['input_dim']
        
        X = torch.randn(num_samples, num_features)
        y = torch.randint(0, self.model_config['output_dim'], (num_samples,))
        
        dataset = torch.utils.data.TensorDataset(X, y)
        return torch.utils.data.DataLoader(dataset, batch_size=32, shuffle=True)

class MedicalPredictorModel(nn.Module):
    """Neural network for medical condition prediction"""
    
    def __init__(self, input_dim: int, hidden_dims: List[int], output_dim: int):
        super().__init__()
        layers = []
        
        current_dim = input_dim
        for hidden_dim in hidden_dims:
            layers.extend([
                nn.Linear(current_dim, hidden_dim),
                nn.ReLU(),
                nn.Dropout(0.3),
                nn.BatchNorm1d(hidden_dim)
            ])
            current_dim = hidden_dim
        
        layers.append(nn.Linear(current_dim, output_dim))
        self.network = nn.Sequential(*layers)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

class RiskAssessmentModel(nn.Module):
    """Model for assessing patient risk factors"""
    
    def __init__(self, input_features: int):
        super().__init__()
        self.feature_extractor = nn.Sequential(
            nn.Linear(input_features, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 64),
            nn.ReLU()
        )
        
        self.risk_classifier = nn.Sequential(
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 3)  # Low, Medium, High risk
        )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        features = self.feature_extractor(x)
        risk_scores = self.risk_classifier(features)
        return torch.softmax(risk_scores, dim=1)

class DrugDiscoveryModel(nn.Module):
    """Model for drug discovery and molecular analysis"""
    
    def __init__(self, molecular_features: int):
        super().__init__()
        self.molecular_encoder = nn.Sequential(
            nn.Linear(molecular_features, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 128)
        )
        
        self.interaction_predictor = nn.Sequential(
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1),  # Drug-target interaction score
            nn.Sigmoid()
        )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        molecular_features = self.molecular_encoder(x)
        interaction_score = self.interaction_predictor(molecular_features)
        return interaction_score

# Usage Example
def run_federated_medical_research():
    """Example of running federated learning for medical research on BNB Chain"""
    
    # Model configuration
    model_config = {
        'type': 'medical_predictor',
        'input_dim': 50,  # Number of health features
        'hidden_dims': [128, 64, 32],
        'output_dim': 5   # Number of conditions to predict
    }
    
    # BNB Smart Chain configuration
    web3_provider = "https://bsc-dataseed1.binance.org/"  # BSC Mainnet
    contract_address = "0x..."  # Your deployed contract address
    
    # Initialize federated model
    fed_model = DeCliNetFederatedModel(
        model_config=model_config,
        web3_provider=web3_provider,
        contract_address=contract_address
    )
    
    # Simulate client data sources (hospitals/clinics)
    client_data_sources = [
        "hospital_1_data_source",
        "clinic_2_data_source", 
        "research_center_3_data_source",
        "telehealth_4_data_source",
        "wearable_data_5_source"
    ]
    
    # Run federated training
    results = fed_model.federated_training_round(
        client_data_sources=client_data_sources,
        num_rounds=20,
        local_epochs=3
    )
    
    print(f"Federated learning completed with accuracy: {results['final_accuracy']:.4f}")
    print(f"Final model stored with hash: {results['final_model_hash']}")
    
    return results, fed_model
```

***

## 8. Frontend & User Experience Design

### 🎨 React/Next.js Application Architecture for BNB Chain

#### **Project Structure**

```
declinet-frontend/
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── layout/                 # Layout components
│   ├── forms/                  # Form components
│   ├── charts/                 # Data visualization
│   └── blockchain/             # BNB Chain specific components
├── pages/
│   ├── patient/                # Patient-specific pages
│   ├── researcher/             # Researcher dashboard
│   ├── dao/                    # DAO governance
│   └── api/                    # API routes
├── hooks/
│   ├── blockchain/             # BNB Chain interaction hooks
│   └── data/                   # Data fetching hooks
├── lib/
│   ├── contracts/              # Smart contract ABIs and addresses
│   ├── web3/                   # Web3 utilities
│   └── utils/                  # General utilities
├── stores/                     # State management (Zustand)
├── types/                      # TypeScript definitions
└── styles/                     # Global styles and Tailwind config
```

#### **BNB Chain Integration Components**

```typescript
// Patient Data Upload Component with BNB Chain integration
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Upload, FileCheck, Coins } from 'lucide-react';
import { PatientDataRegistryABI } from '@/lib/contracts/PatientDataRegistry';
import { DCNET_TOKEN_ADDRESS, PATIENT_DATA_REGISTRY_ADDRESS } from '@/lib/contracts/addresses';

interface DataUploadProps {
  onUploadComplete: (dataId: number) => void;
}

export const PatientDataUpload: React.FC<DataUploadProps> = ({ onUploadComplete }) => {
  const { address, isConnected } = useAccount();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    allowResearch: true,
    allowCommercial: false,
    allowSharing: true,
    retentionPeriod: '5-years'
  });

  // Smart contract interaction
  const { 
    data: submitDataTx, 
    write: submitPatientData, 
    isLoading: isSubmitting 
  } = useContractWrite({
    address: PATIENT_DATA_REGISTRY_ADDRESS,
    abi: PatientDataRegistryABI,
    functionName: 'submitPatientData',
  });

  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: submitDataTx?.hash,
    onSuccess: (data) => {
      toast.success('Data registered on BNB Smart Chain!');
      // Extract dataId from transaction logs
      const dataId = extractDataIdFromLogs(data.logs);
      onUploadComplete(dataId);
      setIsUploading(false);
    },
    onError: (error) => {
      toast.error('Transaction failed');
      console.error('Transaction error:', error);
      setIsUploading(false);
    }
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!consentGiven) {
      toast.error('Please provide consent before uploading data');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. Encrypt file client-side
      setUploadProgress(20);
      const encryptedFile = await encryptFile(file);
      
      // 2. Upload to BNB Greenfield
      setUploadProgress(40);
      const greenfieldHash = await uploadToBNBGreenfield(encryptedFile);
      
      // 3. Generate metadata
      setUploadProgress(60);
      const metadata = {
        originalName: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        privacySettings,
        patientAddress: address,
        greenfieldHash,
        network: 'bsc',
        version: '1.0'
      };
      
      // 4. Store metadata on IPFS (backup)
      const metadataUri = await uploadMetadataToIPFS(metadata);
      
      // 5. Create data hash for blockchain
      const dataHash = await createDataHash(encryptedFile);
      
      // 6. Encode consent permissions
      const consentPermissions = encodeConsentPermissions(privacySettings);
      
      // 7. Submit to BNB Smart Chain
      setUploadProgress(80);
      await submitPatientData({
        args: [dataHash, metadataUri, consentPermissions]
      });
      
      setUploadProgress(100);
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [isConnected, consentGiven, privacySettings, address, submitPatientData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'application/xml': ['.xml'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  const extractDataIdFromLogs = (logs: any[]): number => {
    // Find the DataSubmitted event log and extract dataId
    for (const log of logs) {
      if (log.topics === '0x...') { // DataSubmitted event signature
        return parseInt(log.topics[1], 16); // dataId is the first indexed parameter
      }
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Privacy & Consent Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Consent Management
          </CardTitle>
          <CardDescription>
            Control how your health data is used and shared on BNB Chain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={privacySettings.allowResearch}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  allowResearch: e.target.checked
                }))}
              />
              <span>Allow data use for medical research (earn DCNET rewards)</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={privacySettings.allowCommercial}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  allowCommercial: e.target.checked
                }))}
              />
              <span>Allow commercial use (2x higher DCNET rewards)</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={privacySettings.allowSharing}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  allowSharing: e.target.checked
                }))}
              />
              <span>Allow data sharing with verified researchers</span>
            </label>
          </div>
          
          <div className="space-y-2">
            <label>Data retention period:</label>
            <select
              value={privacySettings.retentionPeriod}
              onChange={(e) => setPrivacySettings(prev => ({
                ...prev,
                retentionPeriod: e.target.value
              }))}
              className="w-full p-2 border rounded"
            >
              <option value="1-year">1 Year</option>
              <option value="5-years">5 Years (Recommended)</option>
              <option value="10-years">10 Years</option>
              <option value="indefinite">Indefinite (Max rewards)</option>
            </select>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Blockchain Storage Info</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your data is encrypted and stored on BNB Greenfield</li>
              <li>• Only metadata hashes are stored on BNB Smart Chain</li>
              <li>• You maintain full control and can revoke access anytime</li>
              <li>• All access is recorded immutably on the blockchain</li>
            </ul>
          </div>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              required
            />
            <span className="text-sm">
              I consent to sharing my health data according to the settings above and understand
              the blockchain storage implications
            </span>
          </label>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5

[1](https://gogetgpt.com/en/events/bnb-hack-mumbai-2025)