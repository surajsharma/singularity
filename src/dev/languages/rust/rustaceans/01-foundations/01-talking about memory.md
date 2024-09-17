## Talking about memory

- Not all memory is created equal. 

- **In most programming environments, your programs have access to a `stack`, a `heap`, `registers`, `text segments`, `memory-mapped registers`, `memory-mapped files`, and perhaps `nonvolatile RAM`**. 
    - a word is 4 bytes, or 32 bits on most systems
    - NVRAM is RAM that retains data without applied power, used to store calibration constants, passwords, or setup information, and may be integrated into a microcontroller.

- Which one you choose to use in a particular situation has implications for what you can store there, how long it remains accessible, and what mechanisms you use to access it. 

- The exact details of these memory regions vary between platforms and are beyond the scope of this book, but some are so important to how you reason about Rust code that they are worth covering here.

