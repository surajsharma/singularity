```rust

/*allows pausing the execution of the current thread
for a specified duration. This function is commonly 
used in scenarios where you want to delay execution to 
simulate wait times, handle polling at less frequent 
intervals, or reduce CPU usage temporarily.*/

use std::thread;
use std::time::Duration;

fn main() {
	println!("Sleeping for 2 seconds...");
	thread::sleep(Duration::new(2, 0));
	println!("Awake!");
}

```
