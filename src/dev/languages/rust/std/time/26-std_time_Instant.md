```rust

/* This feature is useful for benchmarking or timing 
 * how long parts of your program take to execute,
 * particularly for performance optimization tasks */

fn main() {
	use std::thread;
	use std::time::{Instant, Duration};
	//The std::time::Instant structure to measure time intervals.

	let start = Instant::now();
	//Captures current time

	//Simulate some processing work by sleeping for 1 second
	thread::sleep(Duration::new(1, 0));

	let duration = start.elapsed();
	//After waking up, it calculates the elapsed time using start.elapsed()

	println!("expensive_function() consumed: {:?}", duration);
}

```
