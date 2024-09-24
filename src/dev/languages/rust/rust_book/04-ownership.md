## Chapter 4: Understanding Ownership 

- [Chapter 4: Understanding Ownership](#chapter-4-understanding-ownership)
  - [What Is Ownership?](#what-is-ownership)
    - [Ownership Rules](#ownership-rules)
    - [The String Type](#the-string-type)
    - [Memory and Allocation](#memory-and-allocation)
    - [Ownership and Functions](#ownership-and-functions)
    - [Return Values and Scope](#return-values-and-scope)
  - [References and Borrowing](#references-and-borrowing)
    - [Mutable References](#mutable-references)
    - [Dangling References](#dangling-references)
    - [The Rules of References](#the-rules-of-references)
  - [The Slice Type](#the-slice-type)
    - [String Slices](#string-slices)
    - [Other Slices](#other-slices)

### What Is Ownership? 

- [[04-memory regions]]
- stack is faster than heap, lifo 
- heap is more work than stack 

#### Ownership Rules 

1. Each value in Rust has an owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.

#### The String Type 
- But we want to look at data that is stored on the heap and explore how Rust knows when to clean up that data, and the String type is a great example.

- We’ll concentrate on the parts of String that relate to ownership.

- String literals are convenient, but they aren’t suitable for every situation in which we may want to use text.

- One reason is that they’re immutable. Another is that not every string value can be known when we write our code: for example, what if we want to take user input and store it?

- For these situations, Rust has a second string type, `String`. 

- This type manages data allocated on the heap and as such is able to store an amount of text that is unknown to us at compile time. You can create a String from a string literal using the from function, like so: ```let s = String::from("hello");```

#### Memory and Allocation 

- type `String` is stored on the heap 

- `&str` and static string "literals" on the stack 

- integers with known sizes @ compile time on the stack 

- If a type implements the `Copy` trait, variables that use it do not move, but rather are trivially copied, making them still valid after assignment to another variable.

- Rust won’t let us annotate a type with `Copy` if the type, or any of its parts, has implemented the Drop trait

- as a general rule, any group of simple scalar values can implement `Copy`, and nothing that requires allocation or is some form of resource can implement `Copy`

```rs 
//will not work
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}, world!");

//will work
let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {s1}, s2 = {s2}");

let x = 5;
let y = x;
println!("x = {x}, y = {y}");
```

#### Ownership and Functions 

#### Return Values and Scope 

- Returning values can also transfer ownership. 
- can return tuples

### References and Borrowing 

- We call the action of creating a reference [[07-borrowing]].

#### Mutable References 

- Mutable references have one big restriction: if you have a mutable reference to a value, you can have no other references to that value.

- The benefit of having this restriction is that Rust can prevent __data races__ at compile time. 

- > A data race is similar to a race condition and happens when these three behaviors occur:
  - Two or more pointers access the same data at the same time
  - At least one of the pointers is being used to write to the data
  - There’s no mechanism being used to synchronize access to the data

- We also cannot have a mutable reference while we have an immutable one to the same value.

- multiple immutable references are allowed because no one who is just reading the data has the ability to affect anyone else’s reading of the data.


#### Dangling References 

- not possible

#### The Rules of References 

- At any given time, you can have either one mutable reference or any number of immutable references.

- References must always be valid.

### The Slice Type

- Slices let you reference a contiguous sequence of elements in a [[08-common collections]] rather than the whole collection. 

- A slice is a kind of reference, so it does not have ownership.

```rust
fn ch_4(){
  let mut str_lit = String::from("hello");
	str_lit.push_str(", world");

	println!("{}",str_lit);	
	
	let word = first_word(&str_lit);
	//str_lit.clear();
	
	println!("{}",word);
	
	fn first_word(s: &str) -> usize {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }
    s.len()
	}  
}
```

- iterators are discussed in [[13-iterators and closures]]
- `enumerate` method returns a tuple, we can use patterns to destructure that tuple, more in [[06-enums and patterns]].

#### String Slices 

```rs 
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

- With Rust’s `..` range syntax, if you want to start at index 0, you can drop the value before the two periods.

- ``` let hello = &s[0..5];``` === ```let hello = &s[..5];```

- _You can also drop both values to take a slice of the entire string._

```rs 
fn first_word(s: &str) -> &str {
  let bytes = s.as_bytes();
  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }		
  &s[..]
}
```

- Defining a function to take a string slice instead of a reference to a String makes our API more general and useful without losing any functionality

```rs 
fn main() {
    let my_string = String::from("hello world");

    // `first_word` works on slices of `String`s, whether partial or whole
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // `first_word` also works on references to `String`s, which are equivalent
    // to whole slices of `String`s
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word` works on slices of string literals, whether partial or whole
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // Because string literals *are* string slices already,
    // this works too, without the slice syntax!
    let word = first_word(my_string_literal);
}
```


#### Other Slices 

```rs 
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];
assert_eq!(slice, &[2, 3]);
```

- see: [[38-std_slice]]

[//begin]: # "Autogenerated link references for markdown compatibility"
[04-memory regions]: <../rustaceans/01-foundations/04-memory regions> "04-memory regions"
[07-borrowing]: ../rustaceans/01-foundations/07-borrowing "07-borrowing"
[08-common collections]: <08-common collections> "08-common collections"
[13-iterators and closures]: <13-iterators and closures> "13-iterators and closures"
[06-enums and patterns]: <06-enums and patterns> "06-enums and patterns"
[38-std_slice]: ../std/collections/38-std_slice "38-std_slice"
[//end]: # "Autogenerated link references"