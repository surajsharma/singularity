- [Talking about memory](#talking-about-memory)
- [Memory Terminology](#memory-terminology)
- [\[High-and-low level\] mental-models for variables](#high-and-low-level-mental-models-for-variables)
- [Memory Regions](#memory-regions)

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

- High-level model is useful when thinking about code at the level of lifetimes and borrows

- Low-level model is good for when you are reasoning about unsafe code and raw pointers.


### ![](https://img.shields.io/badge/High level model-coral?style=flat-square&color=coral)

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


### ![](https://img.shields.io/badge/Low level model-coral?style=flat-square&color=coral)

- Variables name memory locations that may or may not hold legal values.

- For example, in the statement `let x: usize`, the variable `x` is a name for a region of memory on the stack that has room for a value the size of a `usize`, though it does not have a well-defined value (its slot is empty).

- If you declare multiple variables with the same name, they still end up with different chunks of memory backing them. This model matches the memory model used by C and C++, and many other low-level languages, and is useful for when you need to reason explicitly about memory.

## Memory Regions

- There are many different regions of memory, and perhaps surprisingly, not all of them are stored in the DRAM of your computer.

- The three most important regions for the purposes of writing Rust code are the `stack`, the `heap`, and `static memory`.

### ![](https://img.shields.io/badge/The Stack-coral?style=flat-square&color=coral)

- stack is a segment of memory that your program uses as **scratch space** for function calls

- Each time a function is called, a contiguous chunk of memory called a **frame** is allocated at the top of the stack.

- Near the bottom of the stack is the frame for the `main` function

- as functions call other functions, additional frames are pushed onto the stack

- A function’s frame contains all the variables within that function, along with any arguments the function takes. 

- When the function returns, its stack frame is reclaimed.

- **Stack frames, and crucially the fact that they eventually disappear, are very closely tied to the notion of lifetimes in Rust**

- Any variable stored in a frame on the stack cannot be accessed after that frame goes away, so any reference to it must have a 
lifetime that is at most as long as the lifetime of the frame.

### ![](https://img.shields.io/badge/The Heap-coral?style=flat-square&color=coral)

- ___The heap is a pool of memory that isn’t tied to the current call stack of the program.___

- Values in heap memory live until they are explicitly deallocated.

- This is useful when you want a value to live beyond the lifetime of the current function’s frame.

- If that value is the function’s return value, the calling function can leave some space on its stack for the called function to write that value into before it returns. 

- But if you want to, say, send that value to a different thread with which the current thread may share no stack frames at all, you can store it on the heap.

- when you heap-allocate memory, the resulting pointer has an unconstrained lifetime—its lifetime is however long your program keeps it alive.

- The primary mechanism for interacting with the heap in Rust is the `Box` type. 

- When you write `Box::new(value)`, the value is placed on the heap, and what you are given back (the `Box<T>`) is a pointer to that value on the heap. 

- When the `Box` is eventually dropped, that memory is freed.

- If you forget to deallocate heap memory, it will stick around forever, and your application will eventually eat up all the memory on your machine.

- This is called leaking memory and is usually something you want to avoid. ___However, there are some cases where you explicitly want to leak memory___.

- For example, say you have a read-only configuration that the entire program should be able to access.

- You can allocate that on the heap and explicitly leak it with `Box::leak` to get a `'static` reference to it.

### ![](https://img.shields.io/badge/Static Memory-coral?style=flat-square&color=coral)

- Static memory is really a catch-all term for several closely related regions located in the file your program is compiled into

- These regions are automatically loaded into your program’s memory when that program is executed

- Values in static memory live for the entire execution of your program

- Static memory also holds the memory for variables you declare with the static keyword, as well as certain constant values in your code, like strings.

- The special lifetime `'static`, which gets its name from the static memory region, marks a reference as being valid for "as long as static memory is around," which is until the program shuts down.

- Since a static variable’s memory is allocated when the program starts, a reference to a variable in static memory is, by definition, `'static`, as it is not deallocated until the program shuts down. 

- The inverse is not true—***there can be `'static` references that do not point to static memory***—but the name is still appropriate: once you create a reference with a static lifetime, ***whatever it points to might as well be in static memory*** as far as the rest of the program is concerned, as it can be used for however long your program wishes.
