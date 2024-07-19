1. Bit Shifting:

Bit shifting is like sliding digits in a binary number left or right. In JavaScript, we have three bit shift operators:

- Left shift (<<): Moves bits to the left, adding zeros on the right.
- Right shift (>>): Moves bits to the right, preserving the sign bit.
- Unsigned right shift (>>>): Moves bits to the right, always adding zeros on the left.

Here's a simple example:

```javascript
let num = 5; // In binary: 101
console.log(num << 1); // Left shift by 1, result: 10 (binary: 1010)
console.log(num >> 1); // Right shift by 1, result: 2 (binary: 10)
```

2. Bit Masking:

Bit masking is like using a template to keep or remove certain bits. We use bitwise AND `&` to keep bits and bitwise OR `|` to set bits. It's often used with hexadecimal numbers for readability.

Here's a basic example:

```javascript
let flags = 0b1010; // Binary for 10
let mask = 0b1100;  // Binary for 12

// Keep only the bits that are 1 in both numbers
console.log(flags & mask); // Result: 8 (binary: 1000)

// Set bits that are 1 in either number
console.log(flags | mask); // Result: 14 (binary: 1110)
```

These operations are useful for working with individual bits in numbers, which can be handy for tasks like managing settings, permissions, or optimizing certain algorithms.

Would you like me to elaborate on any part of this explanation or provide more examples?