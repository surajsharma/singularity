- [\`this' keyword](#this-keyword)
  - [Function context](#function-context)
  - [Global context](#global-context)
  - [Constructor function context](#constructor-function-context)
  - [Class context](#class-context)
  - [DOM event handler context](#dom-event-handler-context)
  - [Arrow functions to the rescue](#arrow-functions-to-the-rescue)
  - [Borrowing methods](#borrowing-methods)
  - [Chain constructor calls](#chain-constructor-calls)
  - [Revisit \`\`this'' problem](#revisit-this-problem)
  - [\`\`this'' vs globalThis](#this-vs-globalthis)
  - [Symbols and privacy	Symbol](#symbols-and-privacysymbol)
  - [Adding a description to symbols](#adding-a-description-to-symbols)
  - [Symbol.toPrimitive](#symboltoprimitive)
  - [Symbol.toStringTag](#symboltostringtag)
  - [Symbol.isConcatSpreadable](#symbolisconcatspreadable)


## `this' keyword

- cause of confusion is the different ways in which the value of the `this` keyword is set in different contexts

### Function context

- `this` keyword is mostly used inside functions to refer to the object using which the function was invoked. 
- when a function is invoked as a "method" (invoked using an object) the `this` keyword becomes applicable for referencing the object used to invoke the function.
- `this` keyword is like an implicit parameter passed to a function
- value of implicit parameter `this` is set when the function is invoked. 
- The value of `this` inside a function depends on how that function is called.


```js
const student = {
  id: 123,
  name: "John Doe",
  email: "john@email.com",
  printInfo: function () {
    console.log(`${this.id} - ${this.name} - ${this.email}`);
  }
};

student.printInfo();
// 123 - John Doe - john@email.com
```

- What will this refer to if the function is not invoked as a "method"? Consider the following code
example:

```js 
function orderFood() {
  console.log("Order confirmed against the name: " + this.fullName);
}

orderFood();
// non-strict mode: 
//    Order confirmed against the name: undefined

// strict-mode: 
//    Uncaught TypeError: this is undefined
```

- If non-strict mode, this inside a function, when not invoked as a method, refers to the `global` object, which in the case of browsers is the `window` object

### Global context	

- In the global scope, the value of `this` depends on the environment in which our JavaScript code is executed.

- In the case of **browsers**, the value of `this` in the global scope is the window object.

- In **NodeJS**, the value of `this` depends on whether we are using the ECMAScript modules or the CommonJS modules. 

- In ECMAScript modules, the value of `this` is undefined at the top level of a module. This is because the code in ECMAScript modules is executed in strict mode. 

- In CommonJS modules, at the top level of a module, `this` refers to the module.exports object.

> In Node.js, the JavaScript code is technically not executed in a global scope. Instead, it is executed in a module scope, where commonly used modules are CommonJS and ECMAScript modules

- Inside **web workers**, the value of `this` at the top level refers to the global scope of the web worker, which is different from the global scope containing the window object in the browser. 

  - Code inside a web worker is executed in its own separate context with its own global scope

### Constructor function context	

- When a function is invoked as a constructor function using the `new` keyword, the `this` keyword inside the constructor function refers to the newly created object. 

- The new keyword creates a new object and sets the newly created object as the value of `this`. 

- As a result, we can use `this` inside a constructor function to add properties to the newly created object.


```js 
function Recipe(name, ingredients) {
  this.name = name;
  this.ingredients = ingredients;
}
```

- The function above, when invoked as a constructor function, will add two properties: `name` and `ingredients` to the newly created object.


### Class context	

- Code inside a class in JavaScript is executed in strict mode. 

- the value of `this` inside methods is either `undefined` if not invoked on an object or the class instance itself, which is used to invoke the method.


```js 

class Shape {
  constructor(color) {
    this.color = color;
  }

  printColor() {
    console.log(this.color);
  }
}

const circle = new Shape("Red");
const printColorFn = circle.printColor;
printColorFn();
// Error: this is undefined

```

### DOM event handler context	



### Arrow functions to the rescue	


### Borrowing methods	


### Chain constructor calls	


### Revisit ``this'' problem	


### ``this'' vs globalThis	


### Symbols and privacy	Symbol


### Adding a description to symbols	


### Symbol.toPrimitive	


### Symbol.toStringTag	


### Symbol.isConcatSpreadable	
