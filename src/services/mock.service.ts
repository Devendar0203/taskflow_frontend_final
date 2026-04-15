import { type Task, type Project, type User } from '../types';

// Helper to manage localStorage
const storage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) || 'null'),
  set: (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data)),
};

// Initial Data
const INITIAL_PROJECTS: Project[] = [
  { id: 1, name: 'Welcome Project', description: 'Your first project in TaskFlow' },
];

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Welcome to TaskFlow', description: 'This is a mock task', status: 'TODO', priority: 'MEDIUM', groupId: 1 },
];

export const mockService = {
  init: () => {
    if (!storage.get('mock_projects')) storage.set('mock_projects', INITIAL_PROJECTS);
    if (!storage.get('mock_tasks')) storage.set('mock_tasks', INITIAL_TASKS);
  },

  // Projects
  getProjects: async () => {
    return storage.get('mock_projects') || [];
  },
  createProject: async (data: Partial<Project>) => {
    const projects = await mockService.getProjects();
    const newProject = { ...data, id: Date.now() } as Project;
    projects.push(newProject);
    storage.set('mock_projects', projects);
    return newProject;
  },
  deleteProject: async (id: number) => {
    const projects = (await mockService.getProjects()).filter((p: Project) => p.id !== id);
    storage.set('mock_projects', projects);
    return { success: true };
  },

  // Tasks
  getTasks: async (groupId?: number) => {
    const tasks = storage.get('mock_tasks') || [];
    if (groupId) return tasks.filter((t: Task) => t.groupId === groupId);
    return tasks;
  },
  createTask: async (data: Partial<Task>) => {
    const tasks = await mockService.getTasks();
    const newTask = { 
      status: 'TODO', 
      priority: 'MEDIUM', 
      ...data, 
      id: Date.now() 
    } as Task;
    tasks.push(newTask);
    storage.set('mock_tasks', tasks);
    return newTask;
  },
  updateTask: async (id: number, data: Partial<Task>) => {
    const tasks = await mockService.getTasks();
    const index = tasks.findIndex((t: Task) => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...data };
      storage.set('mock_tasks', tasks);
      return tasks[index];
    }
    throw new Error('Task not found');
  },
  deleteTask: async (id: number) => {
    const tasks = (await mockService.getTasks()).filter((t: Task) => t.id !== id);
    storage.set('mock_tasks', tasks);
    return { success: true };
  },

  // Members (Mocking users)
  getGroupMembers: async (_groupId: number) => {
    return [
      { id: 1, name: 'Demo User', email: 'demo@taskflow.com', role: 'ADMIN' }
    ] as User[];
  }
};
