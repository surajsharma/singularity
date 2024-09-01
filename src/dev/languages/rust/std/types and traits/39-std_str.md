```rs

fn main() {
	let greeting = "Hello, world!";
	let first_word = greeting.split(',').next().unwrap();
	println!("First word: {}", first_word);
}

```