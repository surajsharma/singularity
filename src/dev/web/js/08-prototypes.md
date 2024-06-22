- [Prototypes](#prototypes)
- [How are objects linked?	Prototypes](#how-are-objects-linkedprototypes)
- [The `prototype` property](#the-prototype-property)
- [Getting prototype of any object](#getting-prototype-of-any-object)
- [`Object.prototype` - parent of all objects](#objectprototype---parent-of-all-objects)
- [`Function` function](#function-function)
- [Problems with `__proto__`](#problems-with-__proto__)
- [`Object.create` method](#objectcreate-method)
- [`Null` prototype object](#null-prototype-object)
- [ES2015 classes](#es2015-classes)

### Prototypes 

- Inheritance reduces code duplication and promotes code sharing between
different objects.

- the __prototype chain__ - Think of the scope chain, where each scope is linked to another scope until we reach the global scope. 

- The prototype chain is similar: one object is linked to another object. 

- This other object, in turn, is linked to another object, forming a chain between objects.

- __prototypal inheritance__ When we create an object literal in JavaScript, it is, by default, linked to the built-in `Object.prototype` object

### How are objects linked?	Prototypes

- Objects in JavaScript have a hidden internal slot named `[[Prototype]]` 

- linked to another object by saving a reference to the other object in the `[[Prototype]]` internal slot of the newly created object 

- `obj.[[Prototype]]` gives us the prototype of the obj object

- But as `[[Prototype]]` is an internal slot not accessible by JavaScript


### The `prototype` property



### Getting prototype of any object

- `.getPrototypeOf()`

### `Object.prototype` - parent of all objects

- At the top of the prototypal inheritance hierarchy is the `Object.prototype` object. It is the root object or parent of all objects

```js 
  console.log(Object.getPrototypeOf(obj) === Object.prototype); 
  //true 
  
  console.log(obj.toString()); 
  // [object Object]
  ``` 

- As discussed in the previous lesson, functions have a prototype property that points to an object that serves as the prototype of all instances of that function when that function is invoked as a "constructor". 

- So, the `Object.prototype` object serves as the "prototype" of all objects created via new `Object()` or through object literal notation.



### `Function` function



### Problems with `__proto__`



### `Object.create` method



### `Null` prototype object	

### ES2015 classes


