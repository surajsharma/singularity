```rs 
/*The std::mem module in Rust provides utilities for manipulating
memory, such as functions for measuring the size of types and
swapping values safely.*/

use std::mem;

fn main() {
	let mut x = 5;
	let mut y = 10;
	println!("Before swap: x = {}, y = {}", x, y);

	mem::swap(&mut x, &mut y);
	/*The mem::swap function takes mutable references to the
	variables you want to swap, ensuring that the operation is done
	in-place, which is efficient and safe without violating Rust’s strict
	ownership and borrowing rules. This function is part of the
	memory manipulation utilities in Rust’s standard library, which
	provides low-level control over data manipulation in a safe
	manner.*/
	
	println!("After swap: x = {}, y = {}", x, y);
}
```
