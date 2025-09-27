- [Symbol](#symbol)
  - [Symbols and privacy](#symbols-and-privacy)
  - [Adding a description to symbols](#adding-a-description-to-symbols)
  - [`Symbol.toPrimitive`](#symboltoprimitive)
  - [`Symbol.toStringTag`](#symboltostringtag)
  - [`Symbol.isConcatSpreadable`](#symbolisconcatspreadable)


## Symbol

- symbol is a primitive value that can be created using a function named `Symbol`. 
- What makes this primitive value interesting is that it is **guaranteed to be unique**. 
- Now, symbols can be object keys as well
- Symbols allow JavaScript to add new properties to objects that cannot conflict with the existing properties on objects that others might have used in their code
- Symbols help keep the promise of **backward compatibility**
- Symbol values can be created using the `Symbol` function. 
- It’s important to note that the `Symbol` function must be invoked **without** the `new` keyword. 


```js 

const sym = Symbol();

const obj = {};
obj[sym] = "hello";

console.log(obj[sym]); // hello

```


```js 

const sym = Symbol();

const obj = {
  [sym]: "hello"
};

console.log(obj[sym]); // hello

```


### Symbols and privacy 

- symbol keys are not private 

```js 

const name = Symbol();

const person = {
  [name]: "John Doe"
};

console.log(person.name); // undefined
console.log(person["name"]); // undefined
console.log(person[name]); // John Doe

```

```js 

const name = Symbol();

const person = {
  [name]: "John Doe",
  age: 20
};

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  age: { value: 20, writable: true, enumerable: true, configurable: true },
  [Symbol()]: {
    value: 'John Doe',
    writable: true,
    enumerable: true,
    configurable: true
  }
}
*/


console.log(Object.getOwnPropertySymbols(person));
// [ Symbol() ]

```

### Adding a description to symbols	


### `Symbol.toPrimitive`


### `Symbol.toStringTag`


### `Symbol.isConcatSpreadable`