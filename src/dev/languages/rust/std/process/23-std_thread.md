```rust

/* The std::thread module provides functionality for managing
threads in Rust. It allows you to run code concurrently by creating
multiple threads of execution within the same program. */

use std::thread;
use std::time::Duration;

fn main() {
	/*  we create a new thread using
	std::thread::spawn, where we define a closure (a function without
	a name) that executes a loop */

	let handle = thread::spawn(|| {
		for i in 1..10 {
		/* thread prints numbers from 1 to 9, 
		pausing for half a second between each print */
			println!("Thread: count {}", i);
			thread::sleep(Duration::from_millis(500));
		}
	});

	/* Meanwhile, the main thread also runs its own loop, printing and
	pausing for a full second. */

	for i in 1..5 {
		println!("Main: count {}", i);
		thread::sleep(Duration::from_millis(1000));
	}

	/* ensures that the main thread waits for the spawned thread to finish before 
	exiting, which is crucial for avoiding premature termination of the program. */
	
	handle.join().unwrap();
}

```
