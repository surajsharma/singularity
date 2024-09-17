
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

