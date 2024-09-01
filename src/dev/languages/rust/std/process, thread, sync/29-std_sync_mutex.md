```rs
// Import the Mutex type from the standard library's sync module
use std::sync::Mutex;
// Import the thread module from the standard library
use std::thread;

// Declare a static variable COUNTER of type Mutex<i32>
// This Mutex will be shared across all threads
// The 'static lifetime means this variable will live for the entire duration of the program
static COUNTER: Mutex<i32> = Mutex::new(0);

fn main() {
    // Create a vector to store the handles of our spawned threads
    let mut handles = vec![];
    
    // Spawn 10 threads
    for _ in 0..10 {
        // Spawn a new thread and get its handle
        let handle = thread::spawn(|| {
            // Lock the Mutex to get exclusive access to the counter
            // unwrap() is used here to simplify error handling
            let mut num = COUNTER.lock().unwrap();
            // Increment the counter
            *num += 1;
            // The lock is automatically released when `num` goes out of scope
        });
        
        // Store the handle in our vector
        handles.push(handle);
    }

    // Wait for all threads to complete
    for handle in handles {
        // Join each thread, ensuring it has finished execution
        // unwrap() is used here to simplify error handling
        handle.join().unwrap();
    }

    // Print the final value of the counter
    // We need to lock the Mutex again to access its value
    println!("Result: {}", *COUNTER.lock().unwrap());
}
```
