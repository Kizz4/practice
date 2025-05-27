import type { Task } from '@/models/Task';
import { TaskList } from '@/models/TaskList';

export class TaskListFactory {
  static list(tasks: Task[]): TaskList {
    return new TaskList(tasks);
  }

  static singleTask(task: Task): TaskList {
    return new TaskList([task]);
  }

  static empty(): TaskList {
    return new TaskList([]);
  }

  static from(attribute?: Task | Task[]): TaskList {
    if (!attribute) {
      return this.empty();
    }

    if (Array.isArray(attribute)) {
      return this.list(attribute);
    }

    return this.singleTask(attribute);
  }
}
