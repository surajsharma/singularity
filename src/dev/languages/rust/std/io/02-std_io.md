``` rust 

use std::io;

fn main() {
	let mut input = String::new();
	println!("Please enter some text:");
	
	match io::stdin().read_line(&mut input) {
	// returns a Result type, which can be either Ok or Err
		Ok(_) => println!("You typed: {}", input.trim()),
		Err(error) => println!("Error reading from stdin: {}", error),
	}
}

```
