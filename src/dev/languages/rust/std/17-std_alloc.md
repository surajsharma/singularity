```rust 

/* memory mgmt */

use std::alloc::{alloc, dealloc, Layout};
fn main() {
  unsafe {

    /* unsafe Rust because direct memory management bypasses
       some of Rust's safety guarantees, such as automatic memory
       deallocation and bounds checking. */

    let layout = Layout::from_size_align(16, 8).unwrap();
    // Layout describes the memory's size and alignment.
    // Creating Layout: Layout::from_size_align(16, 8) creates a memory layout of 16 bytes size and 8 bytes alignment

    // unwrap() is used to handle any potential errors in creating
    // the layout, which could occur if the alignment is not a power of two

    let ptr = alloc(layout);

    // Memory Allocation: alloc(layout) allocates memory according
    // to the layout. It returns a raw pointer to the start of the allocated block

    if !ptr.is_null() {
      *(ptr as *mut u32) = 42; // Write a value into the allocated memory

      // The pointer ptr is cast to a *mut u32, a mutable pointer to a u32, 
      // to store the value 42 in the allocated memory

      println!("Value at allocated memory: {}", *(ptr as *mut u32));
      dealloc(ptr, layout); // Clean up: free the memory
    }
  }
}

```
