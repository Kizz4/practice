export type Listener<T> = (value: T) => void;
export declare class ValueObserver<T> {
    private _value;
    private listeners;
    constructor(value?: T | undefined);
    get value(): T | undefined;
    set value(newVal: T);
    subscribe(listener: Listener<T>): () => void;
    private notifyListeners;
}
