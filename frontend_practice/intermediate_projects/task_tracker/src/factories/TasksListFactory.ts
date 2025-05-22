import type { Task } from '@/types/task';
import { TasksList } from '@/models/TasksList';

export class TasksListFactory {
  static list(tasks: Task[]): TasksList {
    return new TasksList(tasks);
  }

  static singleTask(task: Task): TasksList {
    return new TasksList([task]);
  }

  static empty(): TasksList {
    return new TasksList([]);
  }

  static from(attribute?: Task | Task[]): TasksList {
    if (!attribute) {
      return this.empty();
    }

    if (Array.isArray(attribute)) {
      return this.list(attribute);
    }

    return this.singleTask(attribute);
  }
}
