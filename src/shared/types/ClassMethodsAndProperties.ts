/* eslint-disable @typescript-eslint/ban-types */
export type ClassMethods<T> = {
    [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

export type ClassMethodsAndProperties<T> = { [key in keyof T]: T[key] };

export type ClassProperties<T> = Omit<ClassMethodsAndProperties<T>, ClassMethods<T>>;

type ValueObjectValue<T> = {
    [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<{ value: unknown }>
    ? Pick<T[key][number], 'value'>['value'][]
    : T[key] extends Array<Object>
    ? ClassPrimitives<T[key][number]>[]
    : T[key] extends Object
    ? ClassPrimitives<T[key]>
    : T[key];
};

export type ClassPrimitives<T> = ValueObjectValue<ClassProperties<T>>;