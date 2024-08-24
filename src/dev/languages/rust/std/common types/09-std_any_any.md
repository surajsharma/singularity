```rust

use std::any::Any;

fn main() {
    let some_value: Box<dyn Any> = Box::new(10);
    // Box is a smart pointer for heap allocation.
    // dyn Any indicates a trait object, which is a way of using dynamic dispatch to
    // interact with values of different types that implement the Any trait
    // dyn keyword is used to indicate a trait object, which is what we're using here with the Any trait.

    if let Some(number) = some_value.downcast_ref::<i32>() {
        // This method attempts to reference the value as its actual type
        println!("The number is: {}", number);
    } else {
        println!("Not an i32.");
    }
}

```
