```rust

#![allow(dead_code, unused_variables, unused_imports)]

//ch_2
//use std::io;
//use std::cmp::Ordering;

use std::{
	fs, io::{ self, Read, ErrorKind }, 
	cmp::Ordering, 
	collections::HashMap, 
	fs::File
};
	
use rand::Rng;

//ch_7
pub use rust_book::front_of_house::hosting;

//ch 10
use rust_book::{Summary, Tweet, NewsArticle};


// ------------------------------------------------------------


fn main(){
	if true {
		ch_10();
	}else {
		ch_9();
		ch_8();
		ch_5();
		ch_4();
		ch_2();
	}
}


fn ch_10(){
	// generic types, traits, and lifetimes
	// 1 - generic functions
	
	fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
		let mut largest = &list[0];
		for item in list {
			if item > largest {
				largest = item;
			}
		}
		largest
	}
	
	// 2 - generic structs
	// camelCase types
	
	struct Point1<EitherOnlyIntsOrOnlyFloats> {
		x:EitherOnlyIntsOrOnlyFloats,
		y:EitherOnlyIntsOrOnlyFloats,
	}
	
	struct Point2<IntOrFloat,FloatOrInt> {
		x: IntOrFloat,
		y: FloatOrInt,
	
	}
	
	let both_integer = Point1 { x: 5, y: 10 };
	let both_float = Point1 { x: 1.0, y: 4.0 };
	
	let integer_and_float = Point2 { x: 5, y: 4.0 };	
	
	// traits - see lib.rs
	
	let tweet = Tweet {
		username: String::from("horse_ebooks"),
		content: String::from("tweet content is bot"),
		reply: false,
		retweet: false,
	};
	
	//calling custom impl for trait
	println!("1 new tweet: {}", tweet.summarize());
		
	let article = NewsArticle {
		headline: String::from("Breaking News"),
		location: String::from("New York"),
		author: String::from("John Doe"),
		content: String::from("This is the content of the news article."),
	};

	// calling default impl
	println!("New article available! {}", article.summarize());	
	
	
}

fn ch_9(){
	// error handling 
	
	// panic!("I'LL BE BACK!");
	
	// let v = vec![1,1,1];
	// v[99];
	
	let file_result = File::open("rust_book.txt");

	// error matching with match
	let _file = match file_result {
		Ok(file) => file,
		Err(e) => match e.kind() {
			ErrorKind::NotFound => {
				match File::create("rust_book.txt") {
					Ok(fc) => fc,
					Err(e) => panic!("file not created \n{:?}",e),
				}
			},
			_ => panic!("Failed to open file because \n{:?}", e),
		},
	};
	
	// error matching with closures
	let __file = 
	File::open("rust_book2.txt").unwrap_or_else(|err| {
		if err.kind() == ErrorKind::NotFound {
				File::create("rust_book2.txt")
					.unwrap_or_else(|err| {
				panic!("Could not create file {:?}",err);
			})
		} else {
			panic!("Could not open file {:?}", err);
		}
	});

	// propagating errors	
	fn read_username_from_file() -> Result<String, io::Error> {
		
		/* 1 - normal way */
		let uname_file_res = File::open("uname.txt");		
		let mut uname_file = match uname_file_res {
			Ok(f) => f,
			Err(e) => return Err(e),
		};
		
		let mut uname = String::new();
				
		let _ = match uname_file.read_to_string(&mut uname) {
			Ok(_) => Ok(uname),
			Err(e) => Err(e),
		};
		
		/* 2 - shortcut with ? operator */
		//let uname_file_res = File::open("uname.txt")?;
		//let mut uname = String::new();		
		//uname_file.read_to_string(&mut uname)?;
		//Ok(uname);
		
		
		/* 3 - shortcut with chaining */
		//let mut uname = String::new();		
		//File::open("uname.txt")?.read_to_string(&mut uname)?;
		//Ok(uname)
		
		/* 4 - call directly no uname variable needed */
		fs::read_to_string("uname.txt")
		
	}

	// ? with option
	fn last_char_of_first_line(text: &str) -> Option<char> {
		text.lines().next()?.chars().last()
	}
	
	
	
}

fn ch_8(){
	/*Vectors, Strings, Hashmaps*/
	
	let mut v = vec![2,4,6,8,10];
	//mutable vector (to iterate mutable over)
	
	for i in &mut v {
		//mutable iteration
		*i += 1;
	}
	
	for i in &v {
		//immutable iteration, by now v has changed
		println!("{}",i);
	}
	
//	#[derive(Debug)]
	enum SpreadsheetCell {
		Int(i32),
		Float(f64),
		Text(String),
	}
	
	let row = vec![
		SpreadsheetCell::Int(3),
		SpreadsheetCell::Text(String::from("blue")),
		SpreadsheetCell::Float(10.12),
	];
	
	for i in &row {
//		println!("{:?}", i); use with dbg macro above
		match i {
			SpreadsheetCell::Int(value) => println!("{}", value),
			SpreadsheetCell::Float(value) => println!("{}", value),
			SpreadsheetCell::Text(value) => println!("{}", value),
		}
	}
	
	// Strings
	
	// creating a new string with to_string	
	let data = "initial contents";
	let mut s = data.to_string();
	let s2 = "string data".to_string();
	
	// with String::from 
	let s3 = String::from("string data") ;
		
	// updating with push_str
	s.push_str("\n");
	let s4 = String::from("\n s4");

	// concat with +, notice the &
	let s5 = s3 + &s4;
	println!("{}{}{}",s,s2,s5);

	// concat with format!
	let s6 = "to_string()".to_string();
	let s7 = String::from("String::from");
	let s8 = s6 + &s7;
	let s9 = format!("\n--{s8}\n{s5}\n{}",s7);
	println!("{}",s9);
	
	// slicing Strings
	let hello = "Здравствуйте"; 	// unicode String, 2 bytes each
	let s10 = &hello[4..6]; 	// diff of < 2 will err out
	println!("{}",s10);
	
	// iterating over strings
	for c in hello.chars() {
		println!("{c}");
	}
	
	for b in hello.bytes() {
		println!("{b}");
	}
	
	
	// Hashmaps	
	// create
	let mut scores = HashMap::new();
	scores.insert("blue", 9);
	scores.insert("yellow", 90);
	
	// read 
	let score = scores.get("blue").copied().unwrap_or(0);
	println!("score = {score}");	
	
	// update with entry
	scores.entry("green").or_insert(100);

	// for loop read hashmap
	for (k,v) in &scores {
		println!("{k}: {v}");
	}

	// update value based on old value
	let text = "hello world wonderful world";
	let mut map = HashMap::new();
	for word in text.split_whitespace() {
		let count = map.entry(word).or_insert(0);
		*count += 1;
		println!("{word}:{count}");
	} 
	println!("{:?}", map);
}

fn ch_5(){
	
	#[derive(Debug)]
	struct Rectangle {
		width: u32,
		height: u32,
	}
	
	impl Rectangle {
		fn area(&self) -> u32 {
			self.width * self.height
		}
		
		fn square(size: u32) -> Self {
			Self {
				width: size,
				height: size,
			}
		}
	}
	
	
	let rect1 = Rectangle {
		height: 20,
		width: 200
	};
	
	println!("The are of the {:?} is {}", dbg!(&rect1), rect1.area());
	
	
	let sq = Rectangle::square(3);
	
	println!("{:?} is a square", dbg!(sq));
	
}

fn ch_4(){
	let mut str_lit = String::from("hello");
	str_lit.push_str(", world");
	
	println!("{}",str_lit);	
	
	let word = first_word(&str_lit);
	
	//str_lit.clear();
	
	println!("{}",word);
	
	fn first_word(s: &str) -> &str {
		let bytes = s.as_bytes();
		
		for (i, &item) in bytes.iter().enumerate() {
			if item == b' ' {
				return &s[0..i];
			}
		}
		
		&s[..]
	}
}

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
			
		io::stdin()
			.read_line(&mut guess)
			.expect("Failed to read number");

		if guess.trim().is_empty() {
			println!("bye!");
			break;
		} 
		
		
		let guess: i32 = match guess							
						.trim()
						.parse() {
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