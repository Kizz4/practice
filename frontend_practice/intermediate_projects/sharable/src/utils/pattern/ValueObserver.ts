export type Listener<T> = (value: T) => void;


export class ValueObserver<T> {
    private _value: T|undefined;
    private listeners: Listener<T>[];

    constructor(value?: T|undefined) {
        this._value = value;
        this.listeners = [];
    }

    get value(): T|undefined {
        return this._value;
    }

    set value(newVal: T) {
        if (newVal !== this._value) {
            this._value = newVal;
            this.notifyListeners(newVal);
        }
    }

    public subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(newVal: T) {
        for (const listener of this.listeners) {
            listener(newVal);
        }
    }
}