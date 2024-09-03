### Mio is a non-blocking I/O library designed for high-performance network services in Rust. It supports handling thousands of simultaneous connections.

- `cargo.toml`
 
```toml

[dependencies]
mio = {version = "1.0.2", features = ["os-poll", "net"]}

```

```rs
use std::io;
```

- Import the standard I/O library for handling input and output operations.

```rs
use mio::net::TcpListener; 
```

-  Import `TcpListener` from the mio library, which will be used to listen for incoming TCP connections.

```rs
use mio::{Events, Interest, Poll, Token}; 
```

- Import necessary types from mio: `Events` for event handling, 

- `Interest` for specifying event types, Poll for polling events, 

- and `Token` for identifying event sources.

```rs
fn main() -> io::Result<()> { 
```

- The main function returns an `io::Result` to handle potential I/O errors.

```rs
    let mut poll = Poll::new()?;
``` 

- Create a new `Poll` instance. 

- This allows us to monitor multiple event sources like network sockets. 

- The '`?`' operator handles errors, returning them if they occur.

```rs
let mut events = Events::with_capacity(1024); 
```

- Create an `Events` object with a capacity of `1024`. 
- This will store the events that are ready for processing.

```rs
let addr = "127.0.0.1:8080".parse().unwrap(); 
```

- Parse the address string into a `SocketAddr`. 
- This will be the address the server binds to. 
- `unwrap()` is used to handle potential parsing errors, though it will panic if there's an error.

```rs
    let mut server = TcpListener::bind(addr)?; 
```

- Bind the `TcpListener` to the specified address. 
- This starts the server listening for incoming TCP connections.
- Register the `TcpListener` with the `Poll` instance. 
- We associate it with `Token(0)` to identify it later, 
- and specify that we are interested in `READABLE` events 
  - (i.e., when the socket has data to read or a new connection is ready to be accepted).

```rs
    poll.registry().register(&mut server, Token(0), Interest::READABLE)?;    
    loop { 
```

- Start an infinite loop to continually poll for events.

```rs	
        poll.poll(&mut events, None)?; 
```

- Poll for events. The '`None`' argument means there's no timeout, 
  - so it will block until events are received. 
- The events are stored in the '`events`' object.

```rs
        for event in events.iter() {
```
- Iterate over the events that were triggered.

```rs
            match event.token() { 
```

- Match on the token associated with the event to determine the source of the event.
 
```rs

                Token(0) => { 
```

- If the token is `Token(0)`, this means the event is from the 
- `TcpListener` (i.e., a new connection is ready to be accepted).

```rs
				
                    let (_socket, address) = server.accept()?; 
```

- Accept the new connection. 
- '`_socket`' is the `TcpStream` for the connection, 
- and '`address`' is the client's address. 
- The `TcpStream` is not used further in this example.

```rs
                    println!("Accepted connection from: {:?}", address); 
                }
```

- Print a message indicating that a new connection has been accepted, along with the address of the client.

```rs
                _ => unreachable!(), 
```

- This line handles any unexpected tokens. Since we only registered `Token(0)`, this should never be reached. If it is, the program will panic.

```rs
            }
        }
    }
}
```

- This example is useful for understanding how non-blocking I/O operations work in Rust, allowing for efficient handling of multiple connections without the need for threading or excessive resource use.