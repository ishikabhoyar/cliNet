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
}

// Function to generate dummy research projects
export function generateDummyResearchProjects(count: number = 10): ResearchProject[] {
  const categories = ['clinical', 'genomics', 'public_health', 'neuroscience', 'oncology', 'cardiology', 'other'];
  const statuses: Array<'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'> = 
    ['draft', 'submitted', 'under_review', 'approved', 'rejected'];
  
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
      status: statuses[Math.floor(Math.random() * statuses.length)],
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
    createdAt: new Date().toISOString()
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
  
  // Store in localStorage
  localStorage.setItem('researchProjects', JSON.stringify(projects));
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
  localStorage.setItem('authToken', 'dummy-auth-token-' + uuidv4());
  localStorage.setItem('dummyDataInitialized', 'true');
  
  console.log('Initialized dummy data in localStorage');
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
