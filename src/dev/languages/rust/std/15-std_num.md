```rust
/* The std::num module in Rust provides traits and functions related
*  to numeric operations on primitive types, such as type
*  conversions, constants, and computational methods.
*/

fn main() {
    let num = 8;
    let cube_root = f64::from(num).cbrt();
    println!("The cube root of {} is {}", num, cube_root);
}
```
