// lib/dummyData.ts
import { v4 as uuidv4 } from 'uuid';

// Define interfaces for data types
export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  goals: string;
  methodology: string;
  expectedOutcomes: string;
  fundingAmount: number;
  duration: number;
  category: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  researcherId: string;
  feedbacks?: ResearchFeedback[];
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  fundingRequest: number;
  votingStatus: 'open' | 'closed';
  votingEndsAt: string;
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  createdAt: string;
  proposerId: string;
  proposerName: string;
  category: string;
  image?: string;
}

export interface ResearchFeedback {
  id: string;
  message: string;
  createdAt: string;
  reviewerId: string;
  reviewerName: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: 'researcher' | 'admin';
  bio: string;
  walletAddress: string;
  createdAt: string;
  dcnetBalance: number;
  votingHistory: number;
}

export interface UserVote {
  proposalId: string;
  userId: string;
  voteType: 'for' | 'against';
  tokenAmount: number;
  votedAt: string;
}

// Function to generate dummy research projects
export function generateDummyResearchProjects(count: number = 10): ResearchProject[] {
  const categories = ['clinical', 'genomics', 'public_health', 'neuroscience', 'oncology', 'cardiology', 'other'];
  
  // Weighted statuses to have more approved projects
  const weightedStatuses: Array<'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'> = [
    'draft', 'draft',
    'submitted', 'submitted',
    'under_review', 'under_review',
    'approved', 'approved', 'approved', 'approved', 'approved',
    'rejected'
  ];
  
  const projects: ResearchProject[] = [];
  
  for (let i = 0; i < count; i++) {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 60)); // Random date in the last 60 days
    
    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 10)); // Random update 0-10 days after creation
    
    const project: ResearchProject = {
      id: uuidv4(),
      title: `Research Project ${i + 1}: ${getRandomTitle()}`,
      description: getRandomDescription(),
      goals: getRandomGoals(),
      methodology: getRandomMethodology(),
      expectedOutcomes: getRandomOutcomes(),
      fundingAmount: Math.floor(Math.random() * 500000) + 50000, // Random amount between 50k and 550k
      duration: [3, 6, 12, 18, 24, 36][Math.floor(Math.random() * 6)], // Random from predefined durations
      category: categories[Math.floor(Math.random() * categories.length)],
      status: weightedStatuses[Math.floor(Math.random() * weightedStatuses.length)],
      keywords: getRandomKeywords(),
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
      researcherId: "user-" + uuidv4().substring(0, 8)
    };
    
    // Add feedback for non-draft projects
    if (project.status !== 'draft' && Math.random() > 0.5) {
      project.feedbacks = generateDummyFeedback(1 + Math.floor(Math.random() * 3)); // 1-3 feedback items
    }
    
    projects.push(project);
  }
  
  return projects;
}

// Function to generate dummy feedback
function generateDummyFeedback(count: number = 1): ResearchFeedback[] {
  const feedbacks: ResearchFeedback[] = [];
  
  const feedbackMessages = [
    "The methodology is sound, but I would recommend more detail on the data analysis approach.",
    "This is a promising proposal. Consider expanding on the potential clinical applications.",
    "The project aims are clear, but the budget allocation needs more justification.",
    "Excellent proposal with a well-defined hypothesis. Minor revisions suggested in the methodology section.",
    "The research question is novel and addresses an important gap in the literature. Approved with minor revisions.",
    "The project has merit but would benefit from a more robust statistical analysis plan."
  ];
  
  const reviewerNames = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Dr. Elizabeth Taylor",
    "Prof. Robert Williams",
    "Dr. Jennifer Garcia",
    "Prof. David Miller"
  ];
  
  for (let i = 0; i < count; i++) {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days
    
    feedbacks.push({
      id: uuidv4(),
      message: feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)],
      createdAt: createdDate.toISOString(),
      reviewerId: "reviewer-" + uuidv4().substring(0, 8),
      reviewerName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)]
    });
  }
  
  return feedbacks;
}

// Function to generate a dummy user profile
export function generateDummyUserProfile(): UserProfile {
  return {
    id: uuidv4(),
    name: "Dr. Jane Doe",
    email: "jane.doe@research.org",
    institution: "Medical Research Institute",
    role: "researcher",
    bio: "Clinical researcher specializing in genomics and precision medicine with over 10 years of experience in the field.",
    walletAddress: "0x" + Math.random().toString(16).substring(2, 42),
    createdAt: new Date().toISOString(),
    dcnetBalance: 5000,
    votingHistory: 12
  };
}

// Helper functions for generating random content
function getRandomTitle(): string {
  const adjectives = ["Novel", "Innovative", "Advanced", "Comprehensive", "Integrated"];
  const topics = ["Genomic Analysis", "Clinical Trial", "Therapeutic Approach", "Diagnostic Tool", "Treatment Method"];
  const areas = ["Cancer", "Diabetes", "Cardiovascular Disease", "Neurological Disorders", "Infectious Diseases"];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  
  return `${adjective} ${topic} for ${area}`;
}

function getRandomDescription(): string {
  return `This research project aims to develop new methods and approaches for understanding and treating various health conditions. 
  The study will explore innovative techniques and technologies to advance our knowledge in the field and potentially lead to new treatments. 
  By combining multiple disciplinary approaches, we hope to address existing gaps in the current research landscape.`;
}

function getRandomGoals(): string {
  return `1. Identify key biomarkers associated with disease progression
2. Develop a predictive model using machine learning algorithms
3. Validate findings in a diverse patient population
4. Establish clinical guidelines for implementation
5. Assess the cost-effectiveness of the proposed approach`;
}

function getRandomMethodology(): string {
  return `The study will employ a mixed-methods approach combining quantitative and qualitative techniques. 
  Patient data will be collected through electronic health records and direct assessments. 
  Statistical analysis will be performed using R and Python, with machine learning models developed to predict outcomes. 
  Ethical considerations will be addressed throughout the study, with IRB approval already secured.`;
}

function getRandomOutcomes(): string {
  return `We expect this research to result in:
- A validated biomarker panel for early disease detection
- A clinically applicable algorithm for risk stratification
- Publication of at least 3 peer-reviewed articles
- Development of a prototype diagnostic tool
- Training materials for healthcare professionals
- Potential for commercialization and technology transfer`;
}

function getRandomKeywords(): string[] {
  const allKeywords = [
    "genomics", "machine learning", "clinical trials", "biomarkers", "precision medicine", 
    "immunotherapy", "drug discovery", "patient outcomes", "bioinformatics", "healthcare",
    "data analysis", "artificial intelligence", "disease modeling", "public health", "diagnostic"
  ];
  
  const count = 3 + Math.floor(Math.random() * 4); // 3-6 keywords
  const keywords: string[] = [];
  
  while (keywords.length < count) {
    const keyword = allKeywords[Math.floor(Math.random() * allKeywords.length)];
    if (!keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }
  
  return keywords;
}

// Function to initialize local storage with dummy data
export function initializeDummyData(): void {
  // Check if we've already initialized
  if (localStorage.getItem('dummyDataInitialized') === 'true') {
    return;
  }
  
  // Generate and store data
  const projects = generateDummyResearchProjects(15);
  const userProfile = generateDummyUserProfile();
  
  // Ensure we have at least 3 approved projects for DAO voting
  approveResearchProjects(projects, 3);
  
  // Create DAO proposals from approved research projects
  const daoProposals = convertResearchProjectsToDAOProposals(projects);
  
  // Store in localStorage
  localStorage.setItem('researchProjects', JSON.stringify(projects));
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  localStorage.setItem('daoProposals', JSON.stringify(daoProposals));
  localStorage.setItem('userVotes', JSON.stringify([]));
  localStorage.setItem('authToken', 'dummy-auth-token-' + uuidv4());
  localStorage.setItem('dummyDataInitialized', 'true');
  
  console.log('Initialized dummy data in localStorage');
}

// Function to approve a certain number of research projects
export function approveResearchProjects(projects: ResearchProject[], count: number): void {
  let approvedCount = projects.filter(p => p.status === 'approved').length;
  let i = 0;
  
  // Approve more projects until we reach the desired count
  while (approvedCount < count && i < projects.length) {
    if (projects[i].status !== 'approved') {
      projects[i].status = 'approved';
      approvedCount++;
    }
    i++;
  }
}

// Function to generate dummy DAO proposals
export function generateDummyDAOProposals(count: number = 5): DAOProposal[] {
  const categories = ['clinical', 'genomics', 'public_health', 'neuroscience', 'oncology', 'cardiology', 'other'];
  const proposals: DAOProposal[] = [];
  
  const proposerNames = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Dr. Elizabeth Taylor",
    "Prof. Robert Williams",
    "Dr. Jennifer Garcia"
  ];
  
  const proposalTitles = [
    "Advancing Cancer Research with Novel Immunotherapies",
    "Genomic Profiling for Personalized Medicine Approaches",
    "AI-Driven Drug Discovery for Rare Diseases",
    "Clinical Implementation of CRISPR Gene Editing Techniques",
    "Developing Biomarkers for Early Detection of Neurodegenerative Diseases",
    "Blockchain for Secure and Transparent Medical Records",
    "Telemedicine Platforms for Rural Healthcare Access"
  ];
  
  const proposalDescriptions = [
    "This proposal seeks funding for a groundbreaking research project focused on developing new immunotherapies for advanced-stage cancers. The project aims to leverage cutting-edge technologies to identify and validate novel therapeutic targets, ultimately leading to the development of more effective and less toxic cancer treatments.",
    "This project aims to establish a comprehensive genomic profiling platform that can be used to guide personalized treatment decisions for patients with complex diseases. By analyzing genetic markers, we can better predict treatment responses and minimize adverse effects.",
    "We propose to develop an AI-driven platform for accelerating drug discovery for rare diseases. By combining machine learning with molecular modeling, we can identify potential drug candidates more efficiently and at lower cost than traditional methods.",
    "This proposal focuses on the clinical implementation of CRISPR gene editing techniques for treating genetic disorders. We will develop protocols for safe and effective gene editing in clinical settings, with initial focus on blood disorders.",
    "Our team seeks to develop a panel of biomarkers that can detect neurodegenerative diseases years before clinical symptoms appear. This would enable earlier intervention and potentially better outcomes for patients with conditions like Alzheimer's and Parkinson's."
  ];
  
  for (let i = 0; i < count; i++) {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days
    
    const votingEndsDate = new Date(createdDate);
    votingEndsDate.setDate(votingEndsDate.getDate() + 7 + Math.floor(Math.random() * 14)); // Voting ends 7-21 days after creation
    
    const votingStatus: 'open' | 'closed' = new Date() < votingEndsDate ? 'open' : 'closed';
    
    const votesFor = Math.floor(Math.random() * 150000) + 50000; // Between 50k and 200k
    const votesAgainst = Math.floor(Math.random() * 100000) + 10000; // Between 10k and 110k
    
    proposals.push({
      id: uuidv4(),
      title: proposalTitles[i % proposalTitles.length],
      description: proposalDescriptions[i % proposalDescriptions.length],
      fundingRequest: (Math.floor(Math.random() * 20) + 5) * 10000, // Between 50k and 250k
      votingStatus,
      votingEndsAt: votingEndsDate.toISOString(),
      votesFor,
      votesAgainst,
      totalVoters: Math.floor((votesFor + votesAgainst) / 1000) + 500, // Approximate number of voters
      createdAt: createdDate.toISOString(),
      proposerId: "user-" + uuidv4().substring(0, 8),
      proposerName: proposerNames[i % proposerNames.length],
      category: categories[Math.floor(Math.random() * categories.length)]
    });
  }
  
  return proposals;
}

// Function to convert approved research projects to DAO proposals
export function convertResearchProjectsToDAOProposals(projects: ResearchProject[]): DAOProposal[] {
  // Get only approved projects
  const approvedProjects = projects.filter(project => project.status === 'approved');
  
  // Convert them to DAO proposals
  const daoProposals: DAOProposal[] = approvedProjects.map(project => {
    const createdDate = new Date(project.createdAt);
    
    // Set voting end date to 14 days after project approval
    const votingEndsDate = new Date(createdDate);
    votingEndsDate.setDate(votingEndsDate.getDate() + 14);
    
    // Determine if voting is still open
    const votingStatus: 'open' | 'closed' = new Date() < votingEndsDate ? 'open' : 'closed';
    
    // Generate random vote counts if new
    const existingProposals = localStorage.getItem('daoProposals');
    const existingProposalList: DAOProposal[] = existingProposals ? JSON.parse(existingProposals) : [];
    const existingProposal = existingProposalList.find(p => p.id === project.id);
    
    // Use existing vote counts if available, otherwise generate new ones
    const votesFor = existingProposal ? existingProposal.votesFor : Math.floor(Math.random() * 150000) + 50000;
    const votesAgainst = existingProposal ? existingProposal.votesAgainst : Math.floor(Math.random() * 100000) + 10000;
    const totalVoters = existingProposal ? existingProposal.totalVoters : Math.floor((votesFor + votesAgainst) / 1000) + 500;
    
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      fundingRequest: project.fundingAmount,
      votingStatus,
      votingEndsAt: votingEndsDate.toISOString(),
      votesFor,
      votesAgainst,
      totalVoters,
      createdAt: project.createdAt,
      proposerId: project.researcherId,
      proposerName: `Dr. ${project.researcherId.substring(5, 10)}`, // Generate a fake name based on ID
      category: project.category
    };
  });
  
  return daoProposals;
}

// Function to create a new research project
export function createResearchProject(projectData: Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt' | 'researcherId' | 'status'>): ResearchProject {
  // Get existing projects
  const projectsJson = localStorage.getItem('researchProjects');
  const projects: ResearchProject[] = projectsJson ? JSON.parse(projectsJson) : [];
  
  // Create new project
  const newProject: ResearchProject = {
    ...projectData,
    id: uuidv4(),
    status: 'submitted',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    researcherId: JSON.parse(localStorage.getItem('userProfile') || '{}').id || 'unknown-user',
    keywords: Array.isArray(projectData.keywords) ? projectData.keywords : []
  };
  
  // Add to projects list
  projects.push(newProject);
  
  // Save back to localStorage
  localStorage.setItem('researchProjects', JSON.stringify(projects));
  
  return newProject;
}

// Function to get all research projects
export function getResearchProjects(): ResearchProject[] {
  const projectsJson = localStorage.getItem('researchProjects');
  return projectsJson ? JSON.parse(projectsJson) : [];
}

// Function to get a single research project by ID
export function getResearchProjectById(id: string): ResearchProject | null {
  const projects = getResearchProjects();
  return projects.find(project => project.id === id) || null;
}

// Function to update a research project
export function updateResearchProject(id: string, updates: Partial<ResearchProject>): ResearchProject | null {
  const projects = getResearchProjects();
  const index = projects.findIndex(project => project.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // Create updated project
  const updatedProject = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  // Update the array
  projects[index] = updatedProject;
  
  // Save back to localStorage
  localStorage.setItem('researchProjects', JSON.stringify(projects));
  
  // If the project status was updated to 'approved', update DAO proposals
  if (updates.status === 'approved') {
    syncDAOProposalsWithResearchProjects();
  }
  
  return updatedProject;
}

// Function to delete a research project
export function deleteResearchProject(id: string): boolean {
  const projects = getResearchProjects();
  const filteredProjects = projects.filter(project => project.id !== id);
  
  if (filteredProjects.length === projects.length) {
    return false; // No project was removed
  }
  
  // Save back to localStorage
  localStorage.setItem('researchProjects', JSON.stringify(filteredProjects));
  
  return true;
}

// Function to get all DAO proposals
export function getDAOProposals(): DAOProposal[] {
  // First, sync proposals with approved research projects
  syncDAOProposalsWithResearchProjects();
  
  const proposalsJson = localStorage.getItem('daoProposals');
  return proposalsJson ? JSON.parse(proposalsJson) : [];
}

// Function to sync DAO proposals with approved research projects
export function syncDAOProposalsWithResearchProjects(): void {
  // Get all research projects
  const projects = getResearchProjects();
  
  // Convert approved projects to DAO proposals
  const newDAOProposals = convertResearchProjectsToDAOProposals(projects);
  
  // Get existing DAO proposals
  const existingProposalsJson = localStorage.getItem('daoProposals');
  const existingProposals: DAOProposal[] = existingProposalsJson ? JSON.parse(existingProposalsJson) : [];
  
  // Create a map of existing proposals by ID for quick lookup
  const existingProposalMap = new Map<string, DAOProposal>();
  existingProposals.forEach(proposal => {
    existingProposalMap.set(proposal.id, proposal);
  });
  
  // Merge new and existing proposals, preserving voting data
  const mergedProposals: DAOProposal[] = newDAOProposals.map(newProposal => {
    const existingProposal = existingProposalMap.get(newProposal.id);
    if (existingProposal) {
      // Preserve existing vote data
      return {
        ...newProposal,
        votesFor: existingProposal.votesFor,
        votesAgainst: existingProposal.votesAgainst,
        totalVoters: existingProposal.totalVoters
      };
    }
    return newProposal;
  });
  
  // Save back to localStorage
  localStorage.setItem('daoProposals', JSON.stringify(mergedProposals));
}

// Function to get a single DAO proposal by ID
export function getDAOProposalById(id: string): DAOProposal | null {
  const proposals = getDAOProposals();
  return proposals.find(proposal => proposal.id === id) || null;
}

// Function to vote on a DAO proposal
export function voteOnDAOProposal(proposalId: string, voteType: 'for' | 'against', tokenAmount: number): boolean {
  // Get the proposal
  const proposals = getDAOProposals();
  const proposalIndex = proposals.findIndex(p => p.id === proposalId);
  
  if (proposalIndex === -1 || proposals[proposalIndex].votingStatus === 'closed') {
    return false; // Proposal not found or voting closed
  }
  
  // Get user
  const userProfileJson = localStorage.getItem('userProfile');
  if (!userProfileJson) {
    return false; // No user profile
  }
  
  const userProfile: UserProfile = JSON.parse(userProfileJson);
  
  // Check if user has enough tokens
  if (userProfile.dcnetBalance < tokenAmount) {
    return false; // Not enough tokens
  }
  
  // Get existing votes
  const votesJson = localStorage.getItem('userVotes');
  const userVotes: UserVote[] = votesJson ? JSON.parse(votesJson) : [];
  
  // Check if user already voted on this proposal
  const existingVoteIndex = userVotes.findIndex(v => v.proposalId === proposalId && v.userId === userProfile.id);
  
  if (existingVoteIndex !== -1) {
    return false; // Already voted
  }
  
  // Create the vote
  const newVote: UserVote = {
    proposalId,
    userId: userProfile.id,
    voteType,
    tokenAmount,
    votedAt: new Date().toISOString()
  };
  
  // Update proposal votes
  if (voteType === 'for') {
    proposals[proposalIndex].votesFor += tokenAmount;
  } else {
    proposals[proposalIndex].votesAgainst += tokenAmount;
  }
  
  proposals[proposalIndex].totalVoters += 1;
  
  // Update user balance and voting history
  userProfile.dcnetBalance -= tokenAmount;
  userProfile.votingHistory += 1;
  
  // Save everything back to localStorage
  userVotes.push(newVote);
  localStorage.setItem('userVotes', JSON.stringify(userVotes));
  localStorage.setItem('daoProposals', JSON.stringify(proposals));
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  
  return true;
}

// Function to get user's votes
export function getUserVotes(userId?: string): UserVote[] {
  const votesJson = localStorage.getItem('userVotes');
  const allVotes: UserVote[] = votesJson ? JSON.parse(votesJson) : [];
  
  if (!userId) {
    const userProfileJson = localStorage.getItem('userProfile');
    if (!userProfileJson) {
      return []; // No user profile
    }
    userId = JSON.parse(userProfileJson).id;
  }
  
  return allVotes.filter(vote => vote.userId === userId);
}

// Function to check if user has voted on a proposal
export function hasUserVotedOnProposal(proposalId: string): { voted: boolean; voteType?: 'for' | 'against'; amount?: number } {
  const userVotes = getUserVotes();
  const vote = userVotes.find(v => v.proposalId === proposalId);
  
  if (!vote) {
    return { voted: false };
  }
  
  return {
    voted: true,
    voteType: vote.voteType,
    amount: vote.tokenAmount
  };
}

// Function to update user's DCNET balance
export function updateUserDCNETBalance(newBalance: number): boolean {
  const userProfileJson = localStorage.getItem('userProfile');
  if (!userProfileJson) {
    return false;
  }
  
  const userProfile: UserProfile = JSON.parse(userProfileJson);
  userProfile.dcnetBalance = newBalance;
  
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  return true;
}
