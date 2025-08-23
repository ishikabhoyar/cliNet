// Helper for client-side API routes

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export const routes = {
  // Auth routes
  register: `${API_BASE_URL}/researcher/register`,
  authenticate: `${API_BASE_URL}/researcher/authenticate`,
  
  // Profile routes
  getProfile: `${API_BASE_URL}/researcher/profile`,
  updateProfile: `${API_BASE_URL}/researcher/profile`,
  
  // Dataset routes
  searchDatasets: `${API_BASE_URL}/researcher/datasets/search`,
  requestAccess: `${API_BASE_URL}/researcher/datasets/request-access`,
  getAccessRequests: `${API_BASE_URL}/researcher/access-requests`,
  getApprovedDatasets: `${API_BASE_URL}/researcher/approved-datasets`,
  accessDataset: (datasetId: string) => `${API_BASE_URL}/researcher/datasets/${datasetId}/access`,
  
  // Research routes
  createResearch: `${API_BASE_URL}/researcher/research/create`,
  getResearchProjects: `${API_BASE_URL}/researcher/research/projects`,
  getResearchProject: (projectId: string) => `${API_BASE_URL}/researcher/research/projects/${projectId}`,
  updateResearchProject: (projectId: string) => `${API_BASE_URL}/researcher/research/projects/${projectId}`,
  
  // Notification routes
  getNotifications: `${API_BASE_URL}/researcher/notifications`,
  markNotificationAsRead: (notificationId: string) => `${API_BASE_URL}/researcher/notifications/${notificationId}/read`
};

export function getAuthHeader(token?: string) {
  const authToken = token || localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  };
}