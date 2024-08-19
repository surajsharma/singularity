```rust 

//use std::os::windows::ffi::OsStrExt;
use std::ffi::OsStr;

fn main() {
	let os_str = OsStr::new("example");
	
	// The output shows the byte 
	// representation of the string "example", where each number
	// corresponds to the ASCII value of each character in the string.

	let bytes = os_str.as_encoded_bytes();
	println!("{:?}", bytes);
}

```
