export const basic_types_boolean: basic_types_boolean;
export interface basic_types_boolean {
    createBoolean(value: boolean): boolean;
    createEmptyBoolean(): boolean;
    createBooleanFromExistingValue(value: boolean): boolean;
    createBooleanFromPrimitive(value: boolean): boolean;
    operatorBool(value: boolean): boolean;
}

export const basic_types_array: basic_types_array;
export interface basic_types_array{
    createArray(len?: number): [];
    getLength(arr: []): number;
    get<T>(arr:T[],index: number): T;
    set<T>(arr: T[],index: number,ele: T): void;
}
