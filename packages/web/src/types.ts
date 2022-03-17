export type I<T> = (T extends (infer K)[] ? K : T) & object;
