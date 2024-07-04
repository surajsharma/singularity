- [`this` keyword](#this-keyword)
  - [Function context](#function-context)
  - [Global context](#global-context)
  - [Constructor function context](#constructor-function-context)
  - [Class context](#class-context)
  - [DOM event handler context](#dom-event-handler-context)
    - [prototypal inheritance and `this`](#prototypal-inheritance-and-this)
    - [solution 1: local `this`](#solution-1-local-this)
    - [solution 2: arrow functions to the rescue](#solution-2-arrow-functions-to-the-rescue)
    - [solution 3: `bind`](#solution-3-bind)
  - [Borrowing methods	with `call`](#borrowing-methodswith-call)
  - [Chain constructor `call`s](#chain-constructor-calls)
  - [Revisit `this` problem](#revisit-this-problem)
  - [`this` vs `globalThis`](#this-vs-globalthis)


## `this` keyword

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

-  event listener callback is invoked with this set to the HTML element that triggered the event.

#### prototypal inheritance and `this`


- Recall how the value of this gets set inside a function. It depends on how the function is called.

-  the value of this depends on whether our code
is in strict mode or not 

```js

function Counter(startingValue) {
  this.value = startingValue;
}

Counter.prototype.incrementFactory = function (incrementStep) {
  return function () {
    this.value += incrementStep;
    console.log(this.value);
  };
};

const counter = new Counter(0);
const increment5 = counter.incrementFactory(5);
increment5(); // NaN
increment5(); // NaN
increment5(); // NaN

```

- Assuming that our code is in non-strict mode, the value of this inside the `increment5` function is the global object, i.e., the `window` object in the case of browsers

- `this.value` is actually `window.value`, and it is `undefined` because the `window` object, by default, doesn’t have a `value` property. 

- As a result, we get the `NaN` value when `undefined` is added to a number, i.e., the value of the `incrementStep` parameter

#### solution 1: local `this`

```js 

...

Counter.prototype.incrementFactory = function (incrementStep) {
  const thisVal = this; // save `this` value
  return function () {
    thisVal.value += incrementStep;
    console.log(thisVal.value);
  };
};


...

increment5(); // 5
increment5(); // 10
increment5(); // 15

```

#### solution 2: arrow functions to the rescue	

```js 

...

Counter.prototype.incrementFactory = function (incrementStep) {
  return () => {
    this.value += incrementStep;
    console.log(this.value);
  };
};

...

increment5(); // 5
increment5(); // 10
increment5(); // 15

```

- Using an arrow function solves the problem because, unlike regular functions, which get their own value of this when they are invoked, arrow functions don’t get their own this value 

- the value of this inside an arrow function is taken from the surrounding context.

- in the DOM context where `this` refers to the element that triggered the listener...

```js 
const btn = document.querySelector("button");

class FormHandler {
  constructor(submitBtn) {
    submitBtn.addEventListener("click", this.submitForm);
  }

  submitForm() {
    this.sendRequest();
    // ERROR: this.sendRequest is not a function
  }

  sendRequest() {
    console.log('sending request...');
  }
}

new FormHandler(btn);

```

- `this.sendRequest()` call throws an error because `this` needs to refer to an instance of the `FormHandler` class to allow us to call other methods in this class from within the `submitForm` method. 

- So the problem is, how can we call the `sendRequest` method from the `submitForm` method? 

-  there is more than one way to solve this problem. 

-  One of them is to use an arrow function.

```js 
...
submitBtn.addEventListener("click", () => this.submitForm());
...
```

- Javascript also provides us with ways to explicitly set this to whatever value we want.

- We can use any of the following three built-in methods to explicitly set the value of `this`:

#### solution 3: `bind`

- using `bind` to access `this`

```js

function Counter(startingValue) {
  this.value = startingValue;
}

Counter.prototype.incrementFactory = function (incrementStep) {
  // return function () {
  const incrementFn = function () {
    this.value += incrementStep;
    console.log(this.value);
  };

  // return a function with `this` bound
  // to the object used to invoke the
  // `incrementFactory` method
  return incrementFn.bind(this);
};

const counter = new Counter(0);
const increment5 = counter.incrementFactory(5);
increment5(); // 5
increment5(); // 10
increment5(); // 15

```

### Borrowing methods	with `call`

- Imagine having an object that contains methods that can be useful for other objects as well. 

- can we use those methods with other objects? without duplication. 

```js 

const john = {
  name: "John",
  sayHello() {
    console.log("Hello, I am " + this.name);
  }
};

const sarah = {
  name: "Sarah"
};

// borrow a method from john
const sayHello = john.sayHello;
sayHello.call(sarah);
// Hello, I am Sarah
```

- explicitly setting the value of this allows us to reuse code between unrelated objects. 


### Chain constructor `call`s	

- Before classes were introduced in JavaScript, the traditional way of inheriting from another constructor function was to explicitly set the prototype chain and reuse the constructor

```js 
function Employee(name, age, id) {
  this.name = name;
  this.age = age;
  this.id = id;
}

function BankEmployee(name, age, id, bankName) {
  // delegate the responsibility of adding
  // "name", "age", and "id" properties to
  // the Person constructor
  Employee.call(this, name, age, id);
  this.bankName = bankName;
}

```

- `call` method has been used to call the `Employee` constructor, passing in the three properties that the `Employee` constructor can set on the newly created object.

- `this` inside the `BankEmployee` function will be the newly created object.

- In other words, the `Employee` constructor is invoked from inside of the `BankEmployee` constructor, with `this` explicitly set to the newly created `BankEmployee` object.

### Revisit `this` problem	




- ⚠️ browser support might be taken into consideration when using this property

### `this` vs `globalThis`	

