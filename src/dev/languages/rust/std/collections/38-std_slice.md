```rs

/*The std::slice module provides functionality to work with slices,
which are dynamically-sized views into a contiguous sequence,
such as an array or vector. This module includes methods for
slicing data structures safely without taking ownership of them,
enabling efficient access and manipulation.*/

fn main() {
	let arr = [10, 20, 30, 40, 50];
	let slice = &arr[1..4]; 
	// Slicing from index 1 to 3 (exclusive of index 4)
	println!("{:?}", slice);
}

```