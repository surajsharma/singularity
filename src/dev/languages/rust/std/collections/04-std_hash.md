
``` rust 

/*The std::hash module provides traits and utilities for generating
hash values from data. This is fundamental in the operation of
hash maps and sets, which rely on these hashes to efficiently find
and store elements.*/

use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

fn main() {
	let mut hasher = DefaultHasher::new();
	//struct implementing the Hasher trait
	
	let data = "hello suraj";
	data.hash(&mut hasher);
	//The string "hello" implements the Hash trait by default, 
	//which allows it to pass its contents to the hasher
	
	let hash_value = hasher.finish();
	//finish is called to retrieve the hash value

	println!("Data: {}\nHash value: {}", data, hash_value);
}

```

```rust 
use std::collections::hash_map::DefaultHasher;

fn main() {
    let mut hasher = DefaultHasher::new();
    let data = "hello suraj";
	
    std::hash::Hash::hash(data, &mut hasher);
	
    let hash_value = std::hash::Hasher::finish(&hasher);
	
    println!("Data: {}\nHash value: {}", data, hash_value);
}
```
