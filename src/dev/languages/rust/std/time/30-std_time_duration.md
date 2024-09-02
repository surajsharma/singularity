```rs

use std::time::Duration;
use std::thread::sleep;

fn main() {
	let pause_time = Duration::from_secs(2);
	println!("Pausing execution for {:?}...", pause_time);
	sleep(pause_time);
	println!("Resumed execution.");
}


```