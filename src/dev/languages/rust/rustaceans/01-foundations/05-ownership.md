## Ownership

- **all values have a single owner—that is, exactly one location (usually a scope) is responsible for ultimately deallocating each value**
- This is enforced through the borrow checker. 
- If the value is moved, such as 
  - by assigning it to a new variable, 
  - pushing it to a vector, 
  - or placing it on the [heap](./04-memory%20regions.md), 
- the ownership of the value moves from the old location to the new one.
- At that point, you can no longer access the value through variables that flow from the original owner, even though the bits that make up the value are technically still there.
- you must access the moved value through variables that refer to its new location

### rebel types / copy trait
- Some types are rebels and do not follow this rule.
- If a value’s type implements the special `Copy` trait, the value is not considered to have moved even if it is reassigned to a new memory location. Instead, the value is copied, and both the old and new locations remain accessible.
- Most primitive types in Rust, such as the integer and floating-point types, are Copy. 
- NOT COPY - all types that contain non-Copy types as well as any type that owns a resource it must deallocate when the value is dropped eg: Box 

> ⚠️ To see why, consider what would happen if a type like `Box` were Copy. _**If we executed box2 = box1, then box1 and box2 would both believe that they owned the heap memory allocated for the box, and they would both attempt to free it when they went out of scope.**_ Freeing the memory twice could have catastrophic consequences.

- Types usually recursively drop values they contain, so dropping a variable of a complex type may result in many values being dropped.

- A variable that holds a reference to another value does not own that other value, so the value isn’t dropped when the variable drops.

```rs 
let x1 = 42;
let y1 = Box::new(84);
{ // starts a new scope
  let z = (x1, y1);
  // z goes out of scope, and is dropped;
  // it in turn drops the values from x1 and y1
}

// x1's value is Copy, so it was not moved into z
let x2 = x1;
// ❌ y1's value is not Copy, so it was moved into z
//let y2 = y1;
```
[Listing 1-3](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=83bbb810f1db03dd8f2ca01113788236)