```rust

/*The std::env module in Rust is used to access and manipulate
environment variables. It provides functions to retrieve the values
of environment variables, the program's current directory, and
command-line arguments.*/

use std::env;

fn main() {
	let key = "PATH";

	/* We use the env::var function, which returns a Result type that can be either
      Ok containing the value of the environment variable if it exists, or
      Err if it does not exist or cannot be retrieved. */ 

	match env::var(key) {
		Ok(val) => println!("{}: {}", key, val),
		 Err(e) => println!("couldn't interpret {}: {}", key, e),
	}
}

```
