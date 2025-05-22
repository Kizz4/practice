import type { Task } from '@/types/task';

export class TasksList {
    public tasks: Task[];

    constructor(tasks: Task[]) { this.tasks = [...tasks]; }

    static getIds(tasks: Task | Task[]): number[] {
        tasks = TasksList.normalizeArray(tasks);
        return tasks.map(task => task.id);
    }

    static normalizeArray(elements: any | any[]): any[] {
        return Array.isArray(elements) ? elements : [elements]
    }

    public push(tasks: Task | Task[]): void {
        this.tasks.push(...(TasksList.normalizeArray(tasks)));
    }

    public removeAt(index: number): boolean {
        const flag = index >= 0 && index < this.tasks.length;
        if (flag) this.tasks.splice(index, 1);

        return flag;
    }

    public removeById(ids: number | number[]): void {
        const idSet = new Set(TasksList.normalizeArray(ids));
        this.tasks = this.tasks.filter(task => !idSet.has(task.id));
    }

    public remove(tasks: Task | Task[]): void {
        this.removeById(TasksList.getIds(tasks));
    }

    public toggleComplete(tasks: Task | Task[], force?: boolean): void {
        const idSet = new Set(TasksList.getIds(tasks));
        this.tasks
            .filter(task => !idSet.has(task.id))
            .forEach(task => (force !== undefined) ? force : !task.isComplete);
    }

}
