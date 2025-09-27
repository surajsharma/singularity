- [Hoisting](#hoisting)
  - [\`\`var'' declarations](#var-declarations)
  - [Function declarations](#function-declarations)
  - [Function declarations inside blocks](#function-declarations-inside-blocks)
  - [Class declarations](#class-declarations)
  - [Temporal Dead Zone (TDZ)](#temporal-dead-zone-tdz)
  - [Function and class expressions](#function-and-class-expressions)


## Hoisting

### ``var'' declarations	

- variables and functions can be accessed before their actual declaration, and the term used to describe this in JavaScript is "Hoisting."
  
- term "hoisting" is mostly associated with function declarations and variables declared with the

- "var" keyword

### Function declarations

- Function declarations, just like variables declared using the "var" keyword, are also hoisted.

- the function’s name is registered as a variable in the scope containing the function declaration, and it is initialized with the function itself.

- To be able to call a function before or after the function declaration is really useful and frees the developer from arranging the code in such a way that every function declaration comes before it is called.

- helps in code organization

### Function declarations inside blocks	

- In ES2015, the ECMAScript specification defined ___standard and legacy rules___ for handling function declarations

- the function declarations inside blocks are hoisted to the top of the block, converted into a function expression, and assigned to a variable declared with the let keyword.

- The function hoisted inside the block is limited to the containing block and cannot be accessed by code outside the block containing the function.

- It is important to note that the standard rules only come into effect in strict mode[³⁰](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

### Class declarations	

- if class declarations are hoisted, then why can’t we access them before their declaration? 
- The answer to this question is the "Temporal Dead Zone (TDZ)"

### Temporal Dead Zone (TDZ)	

- the time during which the block-scoped variables (let, const) or class declarations cannot be accessed. 
- The time starts from the start of the scope till the declaration is executed.
- TDZ is the reason class declarations cannot be accessed before their declaration is executed during the step-by-step execution of the code.
- As TDZ also applies to the let and const, are the variables declared using let or constants using const also hoisted? Yes, they are also hoisted, but, like the class declarations, they are hoisted differently because of the TDZ.


```javascript
var count = 5;
{
  console.log(count); // hoisted but cannot access due to TDZ
  let count = 10;
}
```

### Function and class expressions	

- The function and class expression are not hoisted
- a misconception about the concept of hoisting, and that is that the JavaScript engine moves the hoisted declarations to the top of the file. Although this makes it easy to understand the concept of hoisting, that is not the reality
- In the case of `var` variables, they are assigned the value of `undefined` until their declaration is executed. 
- In the case of blockscoped variables, they are marked as `"uninitialized"`.
