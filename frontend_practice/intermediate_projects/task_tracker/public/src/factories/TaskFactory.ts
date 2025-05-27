import { Task } from '@/models/Task';

export class TaskFactory {

  static description(description :string): Task {
    return new Task(description, false);
  }

  static all(description :string, isComplete :boolean): Task {
    return new Task(description, isComplete);
  }

  static from(description :string, isComplete? :boolean): Task {
    if (isComplete !== undefined) {
      return this.all(description, isComplete);
    }

    return this.description(description);
  }
}
