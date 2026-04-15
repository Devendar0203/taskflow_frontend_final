import { mockService } from './mock.service';
import { type Task, type TaskStatus } from '../types';

export const taskService = {
  createTask: async (data: Partial<Task>) => {
    return mockService.createTask(data);
  },
  getMyTasks: async () => {
    return mockService.getTasks();
  },
  updateTask: async (id: number, data: Partial<Task>) => {
    return mockService.updateTask(id, data);
  },
  updateTaskStatus: async (id: number, status: TaskStatus) => {
    return mockService.updateTask(id, { status });
  },
  assignTask: async (_taskId: number, _userId: number) => {
    // Mock success
    return { success: true };
  },
  getTasksByProject: async (groupId: number) => {
    return mockService.getTasks(groupId);
  },
  getProjectProgress: async (groupId: number) => {
    const tasks = await mockService.getTasks(groupId);
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t: Task) => t.status === 'DONE').length;
    return (completed / tasks.length) * 100;
  },
  deleteTask: async (id: number) => {
    return mockService.deleteTask(id);
  }
};
