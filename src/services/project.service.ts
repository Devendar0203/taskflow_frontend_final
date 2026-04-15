import { mockService } from './mock.service';
import { type Project } from '../types';

export const projectService = {
  getProjects: async () => {
    return mockService.getProjects();
  },
  createProject: async (data: Partial<Project>) => {
    return mockService.createProject(data);
  },
  addMemberToGroup: async (_groupId: number, _userId: number) => {
    // Just mock success
    return { success: true };
  },
  getGroupMembers: async (groupId: number) => {
    return mockService.getGroupMembers(groupId);
  },
  deleteProject: async (groupId: number) => {
    return mockService.deleteProject(groupId);
  }
};
