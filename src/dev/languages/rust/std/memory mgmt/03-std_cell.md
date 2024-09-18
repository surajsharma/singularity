```rust

/* 	The std::cell module in Rust provides functionality for mutable
	memory locations that can be modified through shared references,
	using types like Cell and RefCell. This is useful in situations where
	you need interior mutability.
	
	These operations are safe even when multiple references to the 
	cell exist, making it a useful tool for managing shared mutable
	state in a controlled manner without violating Rust's borrowing
	rules.
*/

use std::cell::Cell;

fn main() {
	let cell = Cell::new(5);
	println!("Initial value: {}", cell.get());
	cell.set(10);
	println!("Updated value: {}", cell.get());
}

```

> The Cell type in the standard library is an interesting example of safe [interior mutability](../../rustaceans/01-foundations/07-borrowing.html#interior-mutability) through invariants. 
- It is not shareable across threads and never gives out a reference to the value contained in the Cell. 
- Instead, the methods all either replace the value entirely or return a copy of the contained value. 
- Since no references can exist to the inner value, it is always okay to move it. 
- And since Cell isn’t shareable across threads, the inner value will never be concurrently mutated even though mutation happens through a shared reference.
