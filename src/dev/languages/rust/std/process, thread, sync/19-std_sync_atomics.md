```rust
/*
This module provides atomic types for building lock-free data
structures. Remember that atomic operations can be more expensive 
than regular operations, so they should be used judiciously 
in performance-critical code. 

This example demonstrates how to use atomic operations to safely 
share mutable data between threads without locks.
*/

use std::sync::atomic::{AtomicUsize, Ordering};
/* 
Atomics are used for lock-free programming where you can 
perform operations on data across multiple threads without 
needing a mutex.

Operations provided by atomic types ensure that concurrent 
reads and writes to a variable are performed without data races

AtomicUsize is useful in concurrent programming scenarios where 
you need to share a counter between threads safely. 

Ordering::SeqCst (Sequentially Consistent ordering) provides the 
strongest memory ordering guarantees. In a single-threaded 
context like this, you could use Ordering::Relaxed for better 
performance, but SeqCst is fine for demonstration purposes.
*/

fn main() {
    let atomic_counter = AtomicUsize::new(0);
    // initializes a new atomic variable with the initial value 0	
    
    atomic_counter.store(100, Ordering::SeqCst);
    // sets the atomic variable to 100. 
    // Ordering::SeqCst ensures that operations are seen in a consistent order across threads
	
    let value = atomic_counter.load(Ordering::SeqCst);
    // retrieves the current value of the atomic variable with the same memory ordering
	
    println!("Value: {}", value);
}
```
