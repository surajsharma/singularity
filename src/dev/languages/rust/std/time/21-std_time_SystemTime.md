```rust

use std::time::SystemTime;

fn main() {
	let now = SystemTime::now();
	/*
	returns the current time according to the system's clock. 
	The exact output (displayed as seconds and nanoseconds since the Unix epoch) 
	depends on the moment when the function is called. 
	The SystemTime can be used to measure durations or intervals, 
	and is particularly useful in contexts where you need to calculate 
	the elapsed time or schedule future events based on the current system time.	
	*/	
	println!("{:?}", now);
}
```
