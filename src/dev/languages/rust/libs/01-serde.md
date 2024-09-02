- `cargo.toml`

```toml


[dependencies]
serde = { version = "1.0.209", features = ["derive"] }
serde_json = "1.0.127"


```

- basic serde usage


```rs

extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
	id: u32,
	name: String,
	email: String,
}

fn main() {
	let user = User {
		id: 1,
		name: "John Doe".to_string(),
		email: "john.doe@example.com".to_string(),
	};
	
	// serialized into a JSON string.
	let serialized = serde_json::to_string(&user).unwrap();
	println!("{}", serialized); 
	
	// deserialize back into a User instance
	let deserialized: User = serde_json::from_str(&serialized).unwrap();
	println!("Deserialized: {:?}", deserialized);

}

```