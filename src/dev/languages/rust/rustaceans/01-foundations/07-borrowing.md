## Borrowing & Lifetimes 
- Rust allows the owner of a value to lend out that value to others, without giving up ownership, through references.
- References are pointers that come with an additional contract for how they can be used, such as 
  - whether the reference provides ___exclusive access___ to the referenced value, or 
  - whether the referenced value may also have other references point to it

### Shared References

- A shared reference, `&T`, is, as the name implies, a pointer that may be shared. 
- Any number of other references may exist to the same value, and each shared reference is Copy
- so you can trivially make more of them
- ___Rust assumes that shared references are immutable.___
- More concretely, the assertion in Listing 1-4 should never fail.

```rs 

fn cache(input: &i32, sum: &mut i32) {
  *sum = *input + *input;
  assert_eq!(*sum, 2 * *input);
}
```
[Listing 1-4](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=9b1328373bfae1ac78b8140ad668cadf)


### Mutable References

- The alternative to a shared reference is a mutable reference: `&mut T`. 
- the compiler assumes that there are no other threads accessing the target value whether through a shared reference or a mutable one. 
- This enables some interesting optimizations that are not readily available in other languages.

```rs 
fn noalias(input: &i32, output: &mut i32) {
  if *input == 1 {
    *output = 2;
  }

  if *input != 1 {
    *output = 3;
  }
}
```
[Listing 1-5](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=2fbecdaefef8e3a9925023857c7e13d0)

- A mutable reference lets you mutate only the memory location that the reference points to. Whether you can mutate values that lie beyond the immediate reference depends on the methods provided by the type that lies between.

```rs 
let x = 42;
let mut y = &x; // y is of type &i32
let z = &mut y; // z is of type &mut &i32
```
[Listing 1-6](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b3081e09f2ec0b92ad34e2bc7e2a5186)


- In this example, you are able to change the value of the pointer y to a different value (that is, a different pointer) by making it reference a different variable, but you cannot change the value that is pointed to (that is, the value of x). 

- Similarly, you can change the pointer value of y through z, but you cannot change z itself to hold a different reference.

- ___The primary difference between owning a value and having a mutable reference to it is that the owner is responsible for dropping the value when it is no longer necessary.___ 
- Apart from that, you can do anything through a mutable reference that you can if you own the value, with one caveat: 
  - if you move the value behind the mutable reference, then you must leave another value in its place. 
  - If you did not, the owner would still think it needed to drop the value, but there would be no value for it to drop!

```rs 
fn replace_with_84(s: &mut Box<i32>) {
  // this is not okay, as *s would be empty:
  // let was = *s;  //1 - cannot move value out here since caller will try to free at 5 causing double drop
  // but this is:
  let was = std::mem::take(s); //2 - equivalent to std::mem::replace(&mut value, Default::default()); The default is a separate, owned value, so it is safe for the caller to drop it when the scope ends at 5.
  // so is this:
  *s = was; //3
  // we can exchange values behind &mut:
  let mut r = Box::new(84);
  std::mem::swap(s, &mut r); // 4
  assert_ne!(*r, 84);
}

//5

let mut s = Box::new(42);
replace_with_84(&mut s);
```
[Listing 1-7](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=47e0b63098761f38724217191a029eda)

### Interior Mutability
