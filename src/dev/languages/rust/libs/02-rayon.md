- `cargo.toml`

```toml
[dependencies]
serde_json = "1.0.127"

```

- basic rayon usage

- Rayon is a data parallelism library for Rust that allows you to easily convert sequential computations into parallel ones.
- In this example, Rayon is used to perform a parallel sum of an array of integers

```rs

extern crate rayon;
use rayon::prelude::*;
```

- The `rayon::prelude::*` is imported to access the
parallel iterator methods like par_iter, which converts a regular iterator to a parallel iterator.

```rs
fn main() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let sum: i32 = arr.par_iter().sum();
	println!("Sum of array: {}", sum);
}
```

- `sum()`  method is automatically executed in parallel across multiple threads available on the system. 
- This results in a performance improvement, especially for larger data sets or more computationally intensive operations.
- By using Rayon, Rust programs can leverage modern multi-core processors efficiently and effortlessly without needing to manage threads and synchronization explicitly
