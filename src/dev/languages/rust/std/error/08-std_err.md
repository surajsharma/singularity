```rust

/* 	The std::error module in Rust provides traits and types for error
 *	handling. The primary trait is Error, which is used as a base trait
 *	for errors in standard library and user-defined errors 
 */

use std::fmt;

#[derive(Debug)]
struct MyError {
	message: String,
}

impl fmt::Display for MyError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "Error: {}", self.message)
	}
}

impl std::error::Error for MyError {}

fn example_function() -> Result<(), MyError> {
//	Ok(())
	Err(MyError{message: String::from("Outer function error"),})
}

fn inner_function() -> Result<(), MyError> {
	Err(MyError{message: String::from("Inner function error"),})
}

fn main() {
	match example_function() {
		Ok(()) => println!("Success"),
		Err(e) => {
			println!("{}", e);
			match inner_function() {
				Ok(()) => println!("inner success"),
				Err(e) => println!("{}", e)
			}
		}
	}
}

```
