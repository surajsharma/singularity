### Warp is a web server framework for Rust that makes it simple to create HTTP APIs. It leverages powerful filter combinators to easily define RESTful APIs.

---


- `cargo.toml`

```toml
[dependencies]
tokio = { version = "1.40.0",  features = ["full"] }
warp = "0.3.7"

```

```rs 
use warp::Filter;

#[tokio::main]
async fn main() {
	let hello = warp::path!("hello" / String)
				.map(|name| format!("Hello, {}!", name));

//The warp::path! macro is used to define a
//route that captures a String from the URL 
//and uses it to dynamically generate a greeting


	warp::serve(hello)
			.run(([127, 0, 0, 1], 3030))
			.await;

//The route is then served using
//warp::serve, specifying the local address and port.
}
```

