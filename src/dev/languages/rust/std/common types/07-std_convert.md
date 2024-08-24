```rust 

// https://www.youtube.com/watch?v=vH5xXr81a2Y


fn main() {
	let num = 5;
	let num_str: String = num.into();
	//Using the Into trait to convert a number to a string

	//let num_str: String = Into::<String>::into(num.to_string());

	//let num_str: String = num.to_string();


	println!("{}", num_str);
}

```
