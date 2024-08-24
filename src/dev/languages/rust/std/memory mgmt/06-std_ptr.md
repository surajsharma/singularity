```rust


/* 	This example shows how Rust allows for direct memory manipulation through
	pointers, similar to languages like C, but with added safety
	guarantees when used correctly outside of unsafe blocks. 
*/

use std::ptr;

fn main() {
	let mut x:i64 = 10;
	let p = &mut x as *mut i64;
	//p is a mutable pointer to x

	unsafe {
	//unsafe block is required because operations on raw pointers can lead to undefined 
	//behavior if not handled correctly
		ptr::write(p, 20);
		println!("x: {}", x);
	}
}


```
