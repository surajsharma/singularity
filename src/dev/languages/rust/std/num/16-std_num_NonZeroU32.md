```rust
/* std::num::NonZeroU32 is a type that ensures that the value it
holds is always non-zero, which enables certain memory
optimizations.*/

use std::num::NonZeroU32;

fn main() {
    let input = 10; // This is the problematic input
    match NonZeroU32::new(input) {
        Some(non_zero) => {
            println!("The non-zero value is {}", non_zero);
        }
        None => {
            println!("Error: Cannot create a NonZeroU32 with value 0");
        }
    }
}
```
