```rust 

/* memory mgmt */

use std::alloc::{alloc, dealloc, Layout};
fn main() {
  unsafe {
    let layout = Layout::from_size_align(16, 8).unwrap();
    let ptr = alloc(layout);
    if !ptr.is_null() {
      *(ptr as *mut u32) = 42; // Write a value into the allocated memory
      println!("Value at allocated memory: {}", *(ptr as *mut u32));
      dealloc(ptr, layout); // Clean up: free the memory
    }
  }
}

```
