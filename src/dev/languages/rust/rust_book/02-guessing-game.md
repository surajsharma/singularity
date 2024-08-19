- [Chapter 2: Programming a Guessing Game](#chapter-2-programming-a-guessing-game-main)
- [Setting Up a New Project](#setting-up-a-new-project)
- [Processing a Guess](#processing-a-guess)
  - [Storing Values with Variables](#storing-values-with-variables)
  - [Receiving User Input](#receiving-user-input)
  - [Handling Potential Failure with Result](#handling-potential-failure-with-result)
  - [Printing Values with println! Placeholders](#printing-values-with-println-placeholders)
  - [Testing the First Part](#testing-the-first-part)
- [Generating a Secret Number](#generating-a-secret-number)
  - [Using a Crate to Get More Functionality](#using-a-crate-to-get-more-functionality)
  - [Generating a Random Number](#generating-a-random-number)
- [Comparing the Guess to the Secret Number](#comparing-the-guess-to-the-secret-number)
- [Allowing Multiple Guesses with Looping](#allowing-multiple-guesses-with-looping)
  - [Quitting After a Correct Guess](#quitting-after-a-correct-guess)
  - [Handling Invalid Input](#handling-invalid-input)


## Chapter 2: Programming a Guessing Game [[main]]
###  Setting Up a New Project
###  Processing a Guess 
#### Storing Values with Variables 
#### Receiving User Input
#### Handling Potential Failure with Result 
#### Printing Values with println! Placeholders 
#### Testing the First Part
### Generating a Secret Number
#### Using a Crate to Get More Functionality
#### Generating a Random Number
### Comparing the Guess to the Secret Number 
### Allowing Multiple Guesses with Looping 
#### Quitting After a Correct Guess 
#### Handling Invalid Input

```rust

fn ch_2(){
	
	//TODO: impl FromStr trait to input this struct 
	
	pub struct Guess {
		value: i32,
	}
	
	
	impl Guess {
		pub fn new(value: i32) -> Guess {
		if value < 1 || value > 100 {
				panic!("Guess value must be in 1 to 100 range, got {}", value);
		}
			Guess { value }
		}
		
		pub fn value(&self) -> i32 {
			self.value
		}
	}
	
	println!("Guess the number");
	
	loop {
		println!("Enter number to guess: ");
	
		let mut guess = String::new();

		let secret = rand::thread_rng().gen_range(1..=100);
			
		io::stdin().read_line(&mut guess).expect("Failed to read number");

		if guess.trim().is_empty() {
			println!("bye!");
			break;
		} 
		
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
