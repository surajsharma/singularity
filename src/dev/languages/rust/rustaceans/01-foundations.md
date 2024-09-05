- [Talking about memory](#talking-about-memory)
- [Memory Terminology](#memory-terminology)
- [\[High-and-low level\] mental-models for variables](#high-and-low-level-mental-models-for-variables)


## Talking about memory

- Not all memory is created equal. 

- **In most programming environments, your programs have access to a `stack`, a `heap`, `registers`, `text segments`, `memory-mapped registers`, `memory-mapped files`, and perhaps `nonvolatile RAM`**. 
    - a word is 4 bytes, or 32 bits on most systems
    - NVRAM is RAM that retains data without applied power, used to store calibration constants, passwords, or setup information, and may be integrated into a microcontroller.

- Which one you choose to use in a particular situation has implications for what you can store there, how long it remains accessible, and what mechanisms you use to access it. 

- The exact details of these memory regions vary between platforms and are beyond the scope of this book, but some are so important to how you reason about Rust code that they are worth covering here.


## Memory Terminology

- Before we dive into regions of memory, you first need to know about the difference between `values`, `variables`, and `pointers`.

- A `value` in Rust is the **combination** of a **type** and an **element** ***of that type’s domain of values***.

- A `value` can be turned into a sequence of bytes using its type’s representation.


| Value | Type | Memory Representation |
| ----- | ---- | --------------------- |
| 6     | u8   | 0x06                  |


> A value is stored in a place, which is the Rust terminology for “a location that can hold a value.” This place can be on the stack, on the heap, or in a number of other locations. The __most common place to store a value is a variable, which is a named value slot on the stack__.

- A `pointer` is a `value` that holds the __address of a region of memory__, so the pointer points to a __place__.

- We can store the same pointer in more than one variable and therefore have multiple variables that indirectly refer to the same location in memory and thus the same underlying value

- A pointer can be __dereferenced__ to access the value stored in the memory location it points to.

- ```let string = 'Hello world';``` Even though we assign a string value to the variable string, the actual value of the variable is a pointer to the first character in the string value 'Hello world', and not the string value itself.


## [High-and-low level] mental-models for variables

- High-level models are useful when thinking about code at the level of lifetimes and borrows

- Low-level models are good for when you are reasoning about unsafe code and raw pointers.


### ![](https://img.shields.io/badge/High level models-coral?style=flat-square&color=coral)

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
// this access would be illegal, nowhere to draw the flow from:
// assert_eq!(x, 42);
1 x = 42;
// this is okay, can draw a flow from the value assigned above:
2 let y = &x;
// this establishes a second, mutable flow from x:
3 x = 43;
// this continues the flow from y, which in turn draws from x.
// but that flow conflicts with the assignment to x!
4 assert_eq!(*y, 42);
```


### Low level models
