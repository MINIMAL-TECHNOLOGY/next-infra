export declare class GlobalRef<T> {
    private readonly sym;
    constructor(uniqueName: string);
    get value(): T;
    set value(value: T);
}
