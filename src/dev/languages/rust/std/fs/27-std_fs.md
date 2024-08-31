```rs

/*The std::fs module in Rust provides functionality for file and
directory manipulation, including creating, removing, querying,
and modifying files and directories*/

use std::fs;

fn main() {
	// Create a new file
	let result = fs::File::create("output.txt");
	
	match result {
		Ok(_) => println!("File created successfully"),
		Err(e) => println!("Failed to create file: {}", e),
	}
}

```