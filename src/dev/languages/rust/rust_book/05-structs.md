- [Chapter 5: Using Structs to Structure Related Data](#chapter-5-using-structs-to-structure-related-data)
  - [Defining and Instantiating Structs](#defining-and-instantiating-structs)
    - [Using the Field Init Shorthand](#using-the-field-init-shorthand)
    - [Creating Instances from Other Instances with Struct Update Syntax](#creating-instances-from-other-instances-with-struct-update-syntax)
    - [Using Tuple Structs Without Named Fields to Create Different Types](#using-tuple-structs-without-named-fields-to-create-different-types)
    - [Unit-Like Structs Without Any Fields](#unit-like-structs-without-any-fields)
  - [An Example Program Using Structs](#an-example-program-using-structs)
    - [Adding Useful Functionality with Derived Traits](#adding-useful-functionality-with-derived-traits)
  - [Method Syntax](#method-syntax)
    - [Defining Methods](#defining-methods)
    - [Methods with More Parameters](#methods-with-more-parameters)
    - [Associated Functions](#associated-functions)
    - [Multiple `impl` Blocks](#multiple-impl-blocks)
    - [`struct` self/cross-referencing](#struct-selfcross-referencing)


## Chapter 5: Using Structs to Structure Related Data 
### Defining and Instantiating Structs 

-  Like tuples, the pieces of a struct can be different types. 

-  Unlike with tuples, in a struct you’ll name each piece of data so it’s clear what the values mean.

```rs 
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

```rs 
fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
    
    user1.email = String::from("anotheremail@example.com");

}
```

#### Using the Field Init Shorthand 

```rs 
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}
```

#### Creating Instances from Other Instances with Struct Update Syntax 

```rs 
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1 //must come last
    };

    //will not work 
    //println!("{}", user1.username); 

    let user3 = User {
        active: user2.active,
        sign_in_count: user2.sign_in_count,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
    };

    println!("{}", user3.username); 

```

- we used the owned `String` type rather than the `&str` string slice type

- because we want each instance of this struct to own all of its data and for that data to be valid for as long as the entire struct is valid

- It’s also possible for structs to store references to data owned by something else, but to do so requires the use of lifetimes, see [[10-generic types, traits, lifetimes]]


#### Using Tuple Structs Without Named Fields to Create Different Types 

- structs that look similar to tuples, called tuple structs

```rs 
struct Color(i32, i32, i32);
struct Point(i32, i32, f32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0.1);
}
```

#### Unit-Like Structs Without Any Fields 

- structs that don’t have any fields! 

- These are called ___unit-like structs___ because they behave similarly to `()`

```rs 
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

- useful when you need to implement a trait on some type but don’t have any data that you want to store in the type itself 

- You’ll see in [[10-generic types, traits, lifetimes]] how to define traits and implement them on any type, including unit-like structs.


### An Example Program Using Structs 

#### Adding Useful Functionality with Derived Traits 

```rs 
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {}", rect1);
}
```

```
error[E0277]: `Rectangle` doesn't implement `std::fmt::Display`
```

- by default, the curly brackets tell `println!` to use formatting known as `Display`

- with structs, the way println! should format the output is less clear because there are more display possibilities

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {rect1:?}");
}
```

-  we can use `{:#?}` instead of `{:?}` , a bit easier to read

- Another way to print out a value using the Debug format is to use the `dbg!` macro, which takes ownership of an expression (as opposed to println!, which takes a reference)
  -  `dbg!` macro prints to the standard error console stream (`stderr`), as opposed to `println!`, which prints to the standard output console stream (`stdout`). see [[12-cli project]]

- [Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=ffe7b83309f5971c2f12e5cb3f8918cd)

### Method Syntax 

- Unlike functions, methods are defined within the context of a struct (or an enum [[06-enums and patterns]] or a trait [[17 oopf]] object)

- their first parameter is always `self`, which __represents the instance of the struct the method is being called on__

#### Defining Methods 

```rs 
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

#### Methods with More Parameters 

```rs 
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

- Often, but not always, when we give a method the same name as a field we want it to only return the value in the field and do nothing else. 

- Methods like this are called _getters_, and Rust does not implement them automatically for struct fields as some other languages do. 

- _Getters_ are useful because you can make the field private but the method public, and thus enable read-only access to that field as part of the type’s public API. 

- We will discuss what public and private are and how to designate a field or method as public or private in [[07-packages, crates, modules]].

#### Associated Functions 

```rs 
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
```

- call with ```let sq = Rectangle::square(3)```
- This function is namespaced by the struct: the `::` syntax is used for both associated functions and namespaces created by modules. see [[07-packages, crates, modules]].


#### Multiple `impl` Blocks 
- Each struct is allowed to have multiple impl blocks


#### `struct` self/cross-referencing

- [self-referencing](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=eb142e6c272a81fc649ae676bff83df7)

```rs 
// cross referencing
impl Printer {
    // A public method in Printer struct that uses an instance of Calculator
    pub fn print_sum(&self, calculator: &Calculator, x: i32, y: i32) {
        let sum = calculator.add(x, y); // Calling Calculator's method
        println!("The sum of {} and {} is: {}", x, y, sum);
    }
}
```

[//begin]: # "Autogenerated link references for markdown compatibility"
[10-generic types, traits, lifetimes]: <10-generic types%2C traits%2C lifetimes> "10-generic types, traits, lifetimes"
[12-cli project]: <12-cli project> "12-cli project"
[06-enums and patterns]: <06-enums and patterns> "06-enums and patterns"
[17 oopf]: <17 oopf> "17 oopf"
[07-packages, crates, modules]: <07-packages%2C crates%2C modules> "07-packages, crates, modules"
[//end]: # "Autogenerated link references"