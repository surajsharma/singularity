- [Chapter 2: Programming a Guessing Game](#chapter-2-programming-a-guessing-game)
	- [Receiving User Input](#receiving-user-input)
		- [Handling Potential Failure with Result](#handling-potential-failure-with-result)
	- [Generating a Random Number](#generating-a-random-number)
	- [Comparing the Guess to the Secret Number](#comparing-the-guess-to-the-secret-number)
	- [Quitting After a Correct Guess](#quitting-after-a-correct-guess)
	- [Handling Invalid Input](#handling-invalid-input)

## Chapter 2: Programming a Guessing Game

### Receiving User Input

```rs
io::stdin().read_line(&mut guess)
```

- `&` indicates that this argument is a reference, which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times
- references are immutable by default

#### Handling Potential Failure with Result 

```rs 
... .expect("Failed to read number");
```

- `read_line` puts whatever the user enters into the string we pass to it, but it also returns a `Result` value. .

- `Result` is an enumeration, often called an enum, which is a type that can be in one of multiple possible states. 

- We call each possible state a **variant** 

- `Result` types is to encode error-handling information.

- `Result`’s variants are `Ok` and `Err`. 

- The `Ok` variant indicates the operation was successful, and inside `Ok` is the successfully generated value. 

- The `Err` variant means the operation failed, and `Err` contains information about how or why the operation failed.

- Values of the `Result` type, like values of any type, have methods defined on them. 

- An instance of `Result` has an `expect` method that you can call.
 
- If this instance of `Result` is an `Err` value, `expect` will cause the program to crash and display the message that you passed as an argument to `expect`

- If you don’t call `expect`, the program will compile, but you’ll get a warning

### Generating a Random Number

```toml 
[dependencies]
rand = "0.9.0"
```

```rs 
use rand::Rng;
let secret = rand::thread_rng().gen_range(1..=100);
```

-  The `Rng` trait defines methods that random number generators implement
-  `rand::thread_rng` function gives us the particular random
number generator we’re going to use: 
   - one that is local to the current thread of execution and is seeded by the operating system. 

### Comparing the Guess to the Secret Number 

```rs 
match guess.cmp(&secret_number) {
	Ordering::Less => println!("Too small!"),
	Ordering::Greater => println!("Too big!"),
	Ordering::Equal => println!("You win!"),
}
```

- `Ordering` type is another `enum` and has the variants `Less`, `Greater`, and `Equal`

- `cmp` method compares two values and can be called on anything that can be compared
  
- We use a `match` expression to decide what to do next based on which variant of `Ordering` was returned from the call to `cmp` with the values in `guess` and `secret_number`.

- A `match` expression is made up of arms. 

- An arm consists of a pattern to `match` against, and the code that should be run if the value given to match fits that arm’s pattern.

### Quitting After a Correct Guess 

```rs 
Ordering::Equal => {
	println!("You Win!");
	break;
}
```

### Handling Invalid Input

- ignore a non-number so the user can continue guessing

```rs 
match guess.trim().parse() {
	Ok(num) => num,
	Err(err) => {
		println!("{}",err);
		continue;
}
```

---

```rust
fn ch_2(){
	println!("Guess the number");

	loop {
		println!("Enter number to guess: ");
	
		let mut guess = String::new();

		let secret = rand::thread_rng().gen_range(1..=100);
			
		io::stdin().read_line(&mut guess)
		.expect("Failed to read number");

		if guess.trim().is_empty() {
			println!("bye!");
			break;
		} 
		
		//Shadowing and typecasting
		//trim removes whitespace
		//parse converts to i32
		let guess: i32 = 
			match guess.trim().parse() {
			Ok(num) => num,
			Err(err) => {
				println!("{}",err);
				continue;
			}
		};
		
		println!("You guessed {guess}, secret is {secret}");
		
		match guess.cmp(&secret) {
			Ordering::Less => println!("Too Small!"),
			Ordering::Greater => println!("Too Big!"),
			Ordering::Equal => {
				println!("You Win!");
				break;
			}
		}
	}
}

```

[Guess the number](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=d9f8003be0fb2981441e32477f85d9b4)
