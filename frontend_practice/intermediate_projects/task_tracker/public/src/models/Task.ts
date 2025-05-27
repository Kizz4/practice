export class Task {
    static lastID = 0;
    private id: number;
    private description: string;
    private isComplete:boolean;

    constructor(description: string, isComplete:boolean) {
        this.id = Task.lastID++;
        this.description = description;
        this.isComplete = isComplete;
     }

    public getID(): number{return this.id;}
    public getDescription(): string{return this.description;}
    public getIsComplete(): boolean{return this.isComplete;}

    public setIsComplete(isComplete:boolean):void{this.isComplete=isComplete;}
    public toggleIsComplete():void{this.isComplete=!this.isComplete;}
}
