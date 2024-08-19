```rust 

/*The Option type is used in Rust to handle the possibility of
absence. It can either be Some(T) indicating the presence of a
value of type T, or None indicating the absence of that value. This
is particularly useful for functions that may not always have a
meaningful return value. eliminating many common errors found in
other languages (like null pointer exceptions).*/

fn get_even_number(number: i32) -> Option<i32> {
	if number % 2 == 0 {
		Some(number)
	} else {
		None
	}
}

fn main() {
	let number = 30;
	match get_even_number(number) {
		Some(n) => println!("Even number: {}", n),
		None => println!("Not an even number."),
	}
}
```
