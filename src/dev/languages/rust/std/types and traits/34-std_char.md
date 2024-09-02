```rs 

/*The std::char module in Rust provides methods to work with
Unicode scalar values. This includes functions to convert from
numbers to characters, iterate over character properties, and
classify characters based on their properties.*/


fn main() {
	let c = 'ä';
	println!("Is 'ä' alphanumeric? {}", c.is_alphanumeric());
	println!("Is 'ä' a lowercase character? {}", c.is_lowercase());
}

```