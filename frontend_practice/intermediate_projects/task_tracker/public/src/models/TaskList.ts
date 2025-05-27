import type { Task } from '@/models/Task';

export class TaskList {
    private tasks: Task[];

    constructor(tasks: Task[]) { this.tasks = [...tasks]; }

    public getTasks(): Task[]{return this.tasks;}

    static getIds(tasks: Task | Task[]): number[] {
        tasks = TaskList.normalizeArray(tasks);
        return tasks.map(task => task.getID());
    }

    static normalizeArray(elements: any | any[]): any[] {
        return Array.isArray(elements) ? elements : [elements]
    }

    public push(tasks: Task | Task[]): void {
        this.tasks.push(...(TaskList.normalizeArray(tasks)));
    }

    public removeAt(index: number): boolean {
        const flag = index >= 0 && index < this.tasks.length;
        if (flag) this.tasks.splice(index, 1);

        return flag;
    }

    public removeById(ids: number | number[]): void {
        const idSet = new Set(TaskList.normalizeArray(ids));
        this.tasks = this.tasks.filter(task => !idSet.has(task.getID()));
    }

    public remove(tasks: Task | Task[]): void {
        this.removeById(TaskList.getIds(tasks));
    }

    public toggleComplete(tasks: Task | Task[], force?: boolean): void {
        this.toggleCompleteById(TaskList.getIds(tasks), force);
    }

    public toggleCompleteById(ids: number | number[], force?: boolean): void {
        const idSet = new Set(TaskList.normalizeArray(ids));
        this.tasks
            .filter(task => idSet.has(task.getID()))
            .forEach(task => (force !== undefined) ? task.setIsComplete(force) : task.toggleIsComplete());
    }

    public getTaskById(id: number): Task{
        return this.tasks.filter(task => task.getID() == id)[0];
    }

    public orderTasksByCompletedLast(){
        let completeTasks = new Set(this.tasks.filter(task => task.getIsComplete() && true));
        let unfinishedTasks = this.tasks.filter(task => !completeTasks.has(task));
        return [...unfinishedTasks, ...completeTasks];    
    }

}
