import { apiRequest } from './apiClient';

export function getHealthcheck() {
  return apiRequest('/health');
}

export function getProjects() {
  return apiRequest('/projects');
}
