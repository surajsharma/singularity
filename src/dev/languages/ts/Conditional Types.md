```ts

/*
Conditional types are arguably the most unique feature to
TypeScript’s type system. They allow us to introduce a level
of meta-programming unseen in programming languages,
where we can create if/else clauses to determine a type based
on the input type. This allows for a powerful set of tools we
can use to define model and behavior once, and make sure
we don’t end up in type maintenance hell.
*/

type IsArray<T> = T extends any[] ? true : false;
type ArrayOrNot<T> = IsArray<T> extends true ? T : T[];

const arr1: number[] = [1, 2, 3];
const arr2: string[] = ["a", "b", "c"];

const num: number = 42;

const arrOrNot1: ArrayOrNot<typeof arr1> = arr1; 
// Type is number[]

const arrOrNot2: ArrayOrNot<typeof arr2> = arr2; 
// Type is string[]

const arrOrNot3: ArrayOrNot<typeof num> = num; 
// Type is number


```
