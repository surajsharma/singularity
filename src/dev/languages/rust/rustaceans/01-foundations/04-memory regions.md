
## Memory Regions

- There are many different regions of memory, and perhaps surprisingly, not all of them are stored in the DRAM of your computer.

- The three most important regions for the purposes of writing Rust code are the `stack`, the `heap`, and `static memory`.

> ![](https://img.shields.io/badge/The Stack-coral?style=flat-square&color=coral)

- stack is a segment of memory that your program uses as **scratch space** for function calls

- Each time a function is called, a contiguous chunk of memory called a **frame** is allocated at the top of the stack.

- Near the bottom of the stack is the frame for the `main` function

- as functions call other functions, additional frames are pushed onto the stack

- A function’s frame contains all the variables within that function, along with any arguments the function takes. 

- When the function returns, its stack frame is reclaimed.

- **Stack frames, and crucially the fact that they eventually disappear, are very closely tied to the notion of lifetimes in Rust**

- Any variable stored in a frame on the stack cannot be accessed after that frame goes away, so any reference to it must have a 
lifetime that is at most as long as the lifetime of the frame.


> ![](https://img.shields.io/badge/The Heap-coral?style=flat-square&color=coral)

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

> ![](https://img.shields.io/badge/Static Memory-coral?style=flat-square&color=coral)

- Static memory is really a catch-all term for several closely related regions located in the file your program is compiled into

- These regions are automatically loaded into your program’s memory when that program is executed

- Values in static memory live for the entire execution of your program

- Static memory also holds the memory for variables you declare with the static keyword, as well as certain constant values in your code, like strings.

- The special lifetime `'static`, which gets its name from the static memory region, marks a reference as being valid for "as long as static memory is around," which is until the program shuts down.

- Since a static variable’s memory is allocated when the program starts, a reference to a variable in static memory is, by definition, `'static`, as it is not deallocated until the program shuts down. 

- The inverse is not true—***there can be `'static` references that do not point to static memory***—but the name is still appropriate: once you create a reference with a static lifetime, ***whatever it points to might as well be in static memory*** as far as the rest of the program is concerned, as it can be used for however long your program wishes.
