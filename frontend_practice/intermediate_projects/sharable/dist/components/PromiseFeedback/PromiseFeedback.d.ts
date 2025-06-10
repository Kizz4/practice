export declare class PromiseFeedback<T> {
    private _component;
    private status;
    private _defaultContent;
    private _loadingContent;
    private _successContent;
    private _errorContent;
    constructor(defaultContent?: string, loadingContent?: string, sucessContent?: string, errorContent?: string);
    get component(): HTMLDivElement;
    set defaultContent(value: string);
    set loadingContent(value: string);
    set successContent(value: string);
    set errorContent(value: string);
    from(promise: () => Promise<T>, success?: (data: T) => void, failure?: (error: T) => void): void;
    private updateState;
}
