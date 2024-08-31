```rs

use std::net::{TcpListener, TcpStream};

fn handle_client(stream: TcpStream) {
	println!("New connection: {}", stream.peer_addr().unwrap());
}

fn main() {
	let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
	for stream in listener.incoming() {
		match stream {
			Ok(stream) => handle_client(stream),
			Err(e) => println!("Failed to connect: {}", e),
		}
	}
}
```
