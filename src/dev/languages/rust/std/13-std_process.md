```rust 

/* The std::process module in Rust's standard library is used to
spawn and manage child processes.*/

use std::process::Command;

fn main() {
	let output = Command::new("echo")
							.arg("Hello, world!")
							.output()
							.expect("Failed to execute command");
							
	println!("Output: {}", String::from_utf8_lossy(&output.stdout));
}

```
