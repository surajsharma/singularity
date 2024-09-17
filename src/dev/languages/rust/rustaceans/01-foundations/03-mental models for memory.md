
## High-and-low level mental-models

- High-level model is useful when thinking about code at the level of lifetimes and borrows

- Low-level model is good for when you are reasoning about unsafe code and raw pointers.

> ![](https://img.shields.io/badge/High level model-coral?style=flat-square&color=coral)

- In the high-level model, we don’t think of variables as places that hold bytes. 

- Instead, we think of them just as names given to values as they are instantiated, moved, and used throughout a program

- When you assign a value to a variable, that value is from then on named by that variable. 

- When a variable is later accessed, you can ![](https://img.shields.io/badge/imagine drawing a line-red?style=flat-square&color=green) from the previous access of that variable to the new access, which establishes a dependency relationship between the two accesses. 

- ![moved](https://img.shields.io/badge/-If the value in a variable is moved, no lines can be drawn from it anymore.-red?style=flat-square&color=green)

- ![legality](https://img.shields.io/badge/In this model, a variable exists only so long as it holds a legal value-red?style=flat-square&color=green)

- you cannot draw lines from a variable whose value is uninitialized or has been moved, so effectively it isn’t there. 

- Using this model, your entire program consists of many of ![flows](https://img.shields.io/badge/these dependency lines, often called flows-green?style=flat-square&color=green), each one tracing the lifetime of a particular instance of a value. 

- ![flows](https://img.shields.io/badge/Flows can fork and merge-green?style=flat-square&color=green), when there are branches, with each split tracing a distinct lifetime for that value. 

- The compiler can check that at any given point in your program, all flows that can exist in parallel with each other are compatible. 

- For example, there cannot be two parallel flows with mutable access to a value. Nor can there be a flow that borrows a value while there is no flow that owns the value. Listing 1-2 shows examples of both of these cases.

```rs

let mut x;

// 1. this access would be illegal, nowhere to draw the flow from:
// assert_eq!(x, 42);
x = 42;

// 2. this is okay, can draw a flow from the value assigned above:
let y = &x;

// 3. this establishes a second, mutable flow from x:
x = 43;

// 4. this continues the flow from y, which in turn draws from x.
// but that flow conflicts with the assignment to x!
assert_eq!(*y, 42);

```
> [Listing 1-2](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=cc6b2d42d0cab4f5437f6998898a50d4)


```
error[E0506]: cannot assign to `x` because it is borrowed
  --> src/main.rs:13:5
   |
10 |     let y = &x;
   |             -- `x` is borrowed here
...
13 |     x = 43;
   |     ^^^^^^ `x` is assigned to here but it was already borrowed
...
17 |     assert_eq!(*y, 42);
   |     ------------------ borrow later used here
```

- ___Notice that if 4 was not there, this code would compile fine!___ so the BC is objecting to the dereference of Y because the value of x has moved!

- ***Shadowing***: If a new variable is declared with the same name as a previous one, they are still considered distinct variables. This is called _shadowing_ — the later variable 'shadows' the former by the same name. The two variables coexist, though subsequent code no longer has a way to name the earlier one. 


> ![](https://img.shields.io/badge/Low level model-coral?style=flat-square&color=coral)

- Variables name memory locations that may or may not hold legal values.

- For example, in the statement `let x: usize`, the variable `x` is a name for a region of memory on the stack that has room for a value the size of a `usize`, though it does not have a well-defined value (its slot is empty).

- If you declare multiple variables with the same name, they still end up with different chunks of memory backing them. This model matches the memory model used by C and C++, and many other low-level languages, and is useful for when you need to reason explicitly about memory.
